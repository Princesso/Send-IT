import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { pool, dbQuery } from '../database'
import dotenv from 'dotenv'
import Helper from './helper'

dotenv.config();

const Parcels = {
  async create(req, res) {
    let newOrder = {
      placedBy: req.user,
      weight: req.body.weight,
      weightmetric: 'kg',
      sentOn: moment(new Date()),
      status: 'pending',
      fromAddress: req.body.fromAddress,
      toAddress: req.body.toAddress,
      currentLocation: req.body.fromAddress
    };
   await dbQuery('INSERT INTO parcels (placedBy,weight,weightmetric,sentOn,status,fromAddress,toAddress,currentLocation) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [newOrder.placedBy,newOrder.weight,newOrder.weightmetric,newOrder.sentOn,newOrder.status,newOrder.fromAddress,newOrder.toAddress,newOrder.currentLocation],
    (err, dbres) => {
      if (err) {
        res.status(400).json({ "status": res.statusCode, "error": 'An error occured while trying to save your order '})
      } else {
        res.status(200).json({"status": res.statusCode, "data": dbres.rows[0]});
      }
    })
  },

  async getAll(req, res) {
    if(!req.adminStatus) {  
      await dbQuery('SELECT * FROM parcels where placedBy =$1', [req.user], (err, dbres) => {
        if (err) {
          res.status(400).json({ "status": res.statusCode, "error": "Could not get parcels from database"})
        } else {
            if (dbres.rows.length < 1) {
              return res.status(400).json({ "status": res.statusCode, "error": 'You have not created any parcels'})
            }
           // Helper.sendEmail()
            res.status(200).json({"status": res.statusCode, "data": dbres.rows});
        }
      })
    } else {
      await dbQuery('SELECT * FROM parcels', [], (err, dbres) => {
        if (err) {
          res.status(400).json({ "status": res.statusCode, "error": "Could not get parcels from database"})
        } else {
            if (dbres.rows.length < 1) {
              return res.status(400).json({ "status": res.statusCode, "error": 'No parcels found'})
            }
            res.status(200).json({"status": res.statusCode, "data": dbres.rows});
        }
      })
    }
  },
  async getOne(req, res) {
    if (!req.adminStatus) {
      let id = req.params.id
      await dbQuery('SELECT * FROM parcels WHERE ID=$1 and placedBy=$2',[id,req.user], (err, dbres) => {
         if (err) {
           res.status(400).send({ "status": res.statusCode, "error": 'An error occured while retrieving the requested parcel'});
         } else {
           if (dbres.rows < 1) res.status(400).send({"status": res.statusCode, "message": "No such parcel delivery order" });
           res.status(200).send({"status": res.statusCode, "data": dbres.rows});
         }
       })
    } else {
      let id = req.params.id
      await dbQuery('SELECT * FROM parcels WHERE ID=$1',[id], (err, dbres) => {
         if (err) {
           res.status(400).send({ "status": res.statusCode, "error": 'An error occured while retrieving the requested parcel'});
         } else {
           if (dbres.rows < 1) res.status(400).send({"status": res.statusCode, "message": "No such parcel delivery order" });
           res.status(200).send({"status": res.statusCode, "data": dbres.rows[0]});
         }
       })
    }
   },
  async cancel(req, res) {
    const id = req.params.id;
    const newStatus = 'canceled'
   await dbQuery('UPDATE parcels SET status=$1 WHERE id=$2 and placedBy=$3',[newStatus,id, req.user], (err, dbres) => {
      if (err) {
        res.status(400).json({ "status": res.statusCode, "error": 'An error occured while trying to cancel your parcel delivery order'})
      } else {
        if (dbres.rows < 1) res.status(400).send({"status": res.statusCode, "message": "You do not own such parcel delivery order" });
        res.status(200).json({"status": res.statusCode, "Message": "Your Order has been canceled successfully"});
      }
    })
  },
  async changeDestination(req, res) {
    const id = req.params.id;
    const newDestination = req.body.toAddress
    await dbQuery('UPDATE parcels SET toAddress=$1 WHERE id=$2 AND placedBy=$3 returning *',[newDestination,id,req.user], (err, dbres) => {
      if(err) {
        res.status(400).send({ "status": res.statusCode, "error": 'An error occured while trying to change the destination of your parcel delivery order'})
      } else {
        if (dbres.rows < 1) res.status(400).send({"status": res.statusCode, "message": "You do not own such parcel delivery order" });
        else res.status(200).send({"status": res.statusCode, "Message": "Parcel destination updated"});
      }
    })
  },
  async changeCurrentLocation(req, res) {
    if (req.adminStatus) {
      const id = req.params.id;
      const currentLocation = req.body.currentLocation
      await dbQuery('UPDATE parcels SET toAddress=$1 WHERE id=$2',[currentLocation,id], (err, dbres) => {
        if (err) {
          res.status(400).send({ "status": res.statusCode, "error": 'An error occured while trying to change the current location of the parcel delivery order'})     
        } else {
            res.status(200).send({"status": res.statusCode, "Message": "The current location of the parcel has been updated"});
        }
    })
    }
    res.status(400).send({"status": res.statusCode, "Message": "Only admins can access this functionality"});    
  },
}

export default Parcels