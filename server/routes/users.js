import express from 'express'
import bodyParser from 'body-parser'
import Joi from 'joi'
import users from '../mockdata/users'
import {pool, dbQuery} from '../database'


let router = express.Router();
router.use(express.json())

router.get('/', (req,res) => {
  if(users.length == 0) {
    res.send({"status": res.statusCode , "error": 'No users found'});
  }
  res.send({"status": res.statusCode, "data": users});
});

router.get('/:id', (req,res) => {
  let user = users.find(u => u.id === parseInt(req.params.id))
  if(!user){
    res.status(400).send({ "status": res.statusCode, "error": 'No such User please check the ID again'})
  } else {
    res.send({"status": res.statusCode, "data": users});
  }
});

router.get('/:id/parcels', (req,res) => {
  let user = users.find(u => u.id === parseInt(req.params.id))
  if(!user){
    res.status(400).send({"status": res.statusCode, "error":'No such User please check the user ID again'})
  } else if(user.parcels.length==0){
    res.status(400).send({ "status": res.statusCode, "err": 'User does not have any parcel delivery orders'});
  }
  else {
    res.send({ "status": res.statusCode, "data": user.parcels});
  }
});

export default router;