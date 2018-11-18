import express from 'express'
import bodyParser from 'body-parser'
import parcels from '../mockdata/parcels'
import Joi from 'joi'
import { pool, dbQuery } from '../database'
import moment from 'moment'

let router = express.Router();
router.use(express.json())

router.get('/', (req, res) => {
  dbQuery('SELECT * FROM parcels', [], (err, dbres) => {
    if(err) {
      console.log(err)
      res.status(400).json({ "status": res.statusCode, "error": err})
    } else {
        if (dbres.rows.length < 1) {
          return res.status(400).json({ "status": res.statusCode, "error": 'No parcels found'})
        }
        res.status(200).json({"status": res.statusCode, "data": dbres.rows});
    }
  })
});

router.get('/:id', (req, res) => {
  let id = req.params.id
  dbQuery('SELECT * FROM parcels WHERE ID=$1',[id], (err, dbres) => {
    if (err) {
      res.status(400).send({ "status": res.statusCode, "error": 'An error occured while retrieving the requested parcel'});
    } else {
      res.status(200).send({"status": res.statusCode, "data": dbres.rows[0]});
    }
  })
});

router.post('/', (req, res) => {
  let newOrder = {
    placedBy: req.body.placedBy,
    weight: req.body.weight,
    weightmetric: 'kg',
    sentOn: moment(new Date()),
    status: 'pending',
    fromAddress: req.body.fromAddress,
    toAddress: req.body.toAddress,
    currentLocation: req.body.fromAddress
  };
  dbQuery('INSERT INTO parcels (placedBy,weight,weightmetric,sentOn,status,fromAddress,toAddress,currentLocation) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
  [newOrder.placedBy,newOrder.weight,newOrder.weightmetric,newOrder.sentOn,newOrder.status,newOrder.fromAddress,newOrder.toAddress,newOrder.currentLocation],
  (err, dbres) => {
    if(err) {
      res.status(400).json({ "status": res.statusCode, "error": 'An error occured while trying to save your order '})
    } else {
      res.status(200).json({"status": res.statusCode, "data": dbres.rows[0]});
    }
  })
});

router.patch('/:id/cancel', (req, res) => {
  const id = req.params.id;
  const newStatus = 'canceled'
  dbQuery('UPDATE parcels SET status=$1 WHERE id=$2',[newStatus,id], (err, dbres) => {
    if(err) {
      res.status(400).json({ "status": res.statusCode, "error": 'An error occured while trying to cancel your parcel delivery order'})
      pool.end();
    } else {
      res.status(200).json({"status": res.statusCode, "Message": "Your Order has been canceled successfully"});
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

router.patch('/:id/currentlocation', (req, res) => {
  const id = req.params.id;
  const currentLocation = req.params.currentLocation
  dbQuery('UPDATE parcels SET toAddress=$1 WHERE id=$2',[currentLocation,id], (err, dbres) => {
    if(err) {
      res.send({ "status": res.statusCode, "error": 'An error occured while trying to change the destination of your parcel delivery order'})
      pool.end();
    } else {
      res.send({"status": res.statusCode, "Message": "Current location is"});
      console.log(dbres)
    }
  })
})

export default router;