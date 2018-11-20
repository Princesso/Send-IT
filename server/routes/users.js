import express from 'express'
import bodyParser from 'body-parser'
import Joi from 'joi'
import users from '../mockdata/users'
import { pool, dbQuery } from '../database'
import dotenv from 'dotenv'

let router = express.Router();
router.use(express.json())

router.get('/', (req, res) => {
  dbQuery('SELECT * FROM users', [], (err, dbres) => {
    if(err) {
      res.send({ "status": res.statusCode, "error": 'An error occured while trying to retrieve users'})
    } else {
      res.send({"status": res.statusCode, "data": dbres.rows[0]});
    }
  })
});

router.get('/:id', (req, res) => {
  let id = req.params.id
  dbQuery('SELECT * FROM users WHERE ID=$1',[id], (err, dbres) => {
    if (err) {
      res.send({ "status": res.statusCode, "error": 'No such User please check the ID again'})
    } else {
      res.send({"status": res.statusCode, "data": dbres.rows[0]});
    }
  })
});

router.get('/:id/parcels', (req,res) => {
  const id = req.params.id
  dbQuery('SELECT * FROM parcels WHERE placedBy=$1',[id], (err, dbres) => {
    if (err) {
      res.send({ "status": res.statusCode, "error": 'An error occured while trying to retrieve user parcels'})
    } else {
      res.send({"status": res.statusCode, "data": dbres.rows});
    }
  })
});


export default router;