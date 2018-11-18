import express from 'express'
import bodyParser from 'body-parser'
import parcels from '../mockdata/parcels'
import Joi from 'joi'
import { pool, dbQuery } from '../database'

let router = express.Router();
router.use(express.json())

router.get('/', (req, res) => {
  dbQuery('SELECT * FROM parcels', [], (err, dbres) => {
    if(err) {
      res.send({ "status": res.statusCode, "error": 'An error occured while trying to retrieve parcels'})
      pool.end();
    } else {
      res.send({"status": res.statusCode, "data": dbres.rows[0]});
    }
  })
});

router.get('/:id', (req, res) => {
  let id = req.params.id
  dbQuery('SELECT * FROM parcels WHERE ID=$1',[id], (err, dbres) => {
    if (err) {
      res.send({ "status": res.statusCode, "error": 'An error occured while retrieving the requested parcel '})
      pool.end()
    } else {
      res.send({"status": res.statusCode, "data": dbres.rows[0]});
    }
  })
});

let schema = Joi.object().keys({
  placedBy: Joi.number().required(),
  weight: Joi.number().required(),
  weightmetric: Joi.string().required(),
  sentOn: Joi.date().required(),
  deliveredOn: Joi.date(),
  status: Joi.string().min(3).required(),
  fromAddress: Joi.string().min(3).required(),
  toAddress: Joi.string().min(3).required(),
  currentLocation: Joi.string().min(3).required(),
})

router.post('/', (req, res) => {
  let newOrder = {
    placedBy: req.body.placedBy,
    weight: req.body.weight,
    weightmetric: req.body.weightmetric,
    sentOn: req.body.sentOn,
    deliveredOn: req.body.deliveredOn,
    status: req.body.status,
    fromAddress: req.body.fromAddress,
    toAddress: req.body.toAddress,
    currentLocation: req.body.currentLocation
  };
  dbQuery('INSERT INTO parcels (placedBy,weight,weightmetric,sentOn,deliveredOn,status,fromAddress,toAddress,currentLocation) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
  [newOrder.placedBy,newOrder.weight,newOrder.weightmetric,newOrder.sentOn,newOrder.deliveredOn,newOrder.status,newOrder.fromAddress,newOrder.toAddress,newOrder.currentLocation],
  (err, dbres) => {
    if(err) {
      console.log(err)
      res.send({ "status": res.statusCode, "error": 'An error occured while trying to save your order '})
      pool.end()
    } else {
      res.send({"status": res.statusCode, "data": dbres.rows[0]});
    }
  })
});

router.patch('/:id/cancel', (req, res) => {
  const id = req.params.id;
  const newStatus = 'canceled'
  dbQuery('UPDATE parcels SET status=$1 WHERE id=$2',[newStatus,id], (err, dbres) => {
    if(err) {
      res.send({ "status": res.statusCode, "error": 'An error occured while trying to cancel your parcel delivery order'})
      pool.end();
    } else {
      res.send({"status": res.statusCode, "Message": "Your Order has been canceled successfully"});
    }
  })
})

router.patch('/:id/destination', (req, res) => {
  const id = req.params.id;
  const newDestination = req.params.toAddress
  dbQuery('UPDATE parcels SET toAddress=$1 WHERE id=$2',[newDestination,id], (err, dbres) => {
    if(err) {
      res.send({ "status": res.statusCode, "error": 'An error occured while trying to change the destination of your parcel delivery order'})
      pool.end();
    } else {
      res.send({"status": res.statusCode, "Message": "Parcel destination updated"});
      console.log(dbres)
    }
  })
})

export default router;