import express from 'express'
import bodyParser from 'body-parser'
import parcels from '../mockdata/parcels'
import Joi from 'joi'

let router = express.Router();
router.use(express.json())

router.get('/', (req,res) => {
  if(parcels.length==0) {
    res.send({'status': res.statusCode, 'error': 'No parcels found'});
    return
  }
  res.send({'status': res.statusCode, 'data': parcels});
});

router.get('/:id', (req,res) => {
  let parcel = parcels.find(p => p.id === parseInt(req.params.id))
  if(!parcel){
    res.status(400).send({'status': res.statusCode, 'error': 'No parcel with such ID, check the parcel ID again'})
    return
  } else {
    res.send({'status': res.statusCode, 'data': parcel});
  }
});

let schema = Joi.object().keys({
  placedBy: Joi.number().required(),
  weight: Joi.number().required(),
  weightmetric: Joi.string().required(),
  sentOn: Joi.string().min(3).required(),
  deliveredOn: Joi.string().min(3).required(),
  status: Joi.string().min(3).required(),
  fromAddress: Joi.string().min(3).required(),
  toAddress: Joi.string().min(3).required(),
  currentLocation: Joi.string().min(3).required(),
})

router.post('/', (req, res) => {
  const result = Joi.validate(req.body, schema)
  if(result.error){
    res.send({'status': res.statusCode, 'error':result.error.details[0].message})
    return
  } else {
    let newOrder = {
      id: parcels.length +1,
      placedBy: req.body.placedBy,
      weight: req.body.weight,
      weightmetric: req.body.weightmetric,
      sentOn: req.body.sentOn,
      deliveredOn: req.body.deliveredOn,
      status: req.body.status,
      fromAddress: req.body.fromaddress,
      toAddress: req.body.toaddress,
      currentLocation: req.body.currentLocation
    };
    parcels.push(newOrder);
    res.send({'status': res.statusCode, 'data': newOrder});
  }
});

router.put('/:id/cancel', (req, res) => {
  const changeStatusId = parcels.find(p => p.id === parseInt(req.params.id))
  if(!changeStatusId) {
    res.send({'status': res.statusCode, 'error': 'No parcel with the id provided'})
  } else {
    const changeIndex = parcels.indexOf(changeStatusId)
    parcels[changeIndex].status = 'cancel'
    res.send({'status': res.statusCode, 'data': changeStatusId})
  }
})

router.delete('/:id', (req, res) => {
  const deleteOrder = parcels.find(p => p.id === parseInt(req.params.id))
  if (!deleteOrder){
    res.send({'status': res.statusCode, 'error': 'No parcel with the id provided'});
  } else {
    const deleteindex = parcels.indexOf(deleteOrder);
    parcels.splice(deleteindex,1)
    res.send({'status': res.statusCode, 'data': deleteOrder});
  }
})

export default router;