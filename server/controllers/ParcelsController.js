import moment from 'moment'
import db  from '../config'
import dotenv from 'dotenv'
import Helper from '../helpers/helper'
import {
  createParcelsSchema,
  destinationSchema,
  changeCurrentLocation,
  currentLocationSchema,
  changeStatusSchema
} from '../helpers/validator'

dotenv.config();

class Parcels {
  static create(req, res) {
    let newOrder = {
      placedBy: req.user,
      weight: req.body.weight,
      weightmetric: 'kg',
      sentOn: moment(new Date()),
      status: 'pending',
      fromAddress: req.body.fromAddress,
      toAddress: req.body.toAddress,
      currentLocation: req.body.fromAddress,
      itemName: req.body.itemName
    };

    const fieldError = createParcelsSchema(newOrder)
    if(fieldError) {
      return res.status(400).json({"status": res.statusCode, "message": fieldError});
    }

    const query = `INSERT INTO parcels (placedby,weight,weightmetric,senton,status,fromaddress,toaddress,currentlocation,itemname) 
                  VALUES('${newOrder.placedBy}','${newOrder.weight}','${newOrder.weightmetric}','${newOrder.sentOn}','${newOrder.status}','${newOrder.fromAddress}'
                  ,'${newOrder.toAddress}','${newOrder.currentLocation}',${newOrder.itemName})`
    db.query(query)
    .then((result) => {
      if(result.rowCount === 0) {
        res.status(500).json({ "status": res.statusCode, "Message": 'An error occured while trying to save your order ensure that weight is a valid number and Address are not empty'})
      } else if(result.rowCount >= 1) {
        res.status(201).json({"status": res.statusCode, "message": "New parcel added successfuly"});
      }
    })
    .catch((error) => {
      res.status(500).json({ "status": res.statusCode, "error": 'An error occured while trying to save your order,weight may not be a number '})
    })
  }

  static getAll(req, res) {
      if(!req.adminStatus) {
        const query =  `SELECT * FROM parcels where placedBy ='${req.user}'`
        db.query(query)
        .then((result) => {
          if(result.rowCount === 0) {
            return res.status(204).json({ "status": res.statusCode, "error": 'You have not created any parcels'})
          } else if (result.rowCount >= 1) {
            res.status(200).json({"status": res.statusCode, "data": result.rows});
          }
        })
        .catch((error) => {
          res.status(500).json({ "status": res.statusCode, "error": "Could not get parcels from database"})
        })

      } else {
        const query =  `SELECT * FROM parcels`
        db.query(query)
        .then((result) => {
          if(result.rowCount === 0) {
            return res.status(204).json({ "status": res.statusCode, "error": 'No Parcels'})
          } else if (result.rowCount >= 1) {
            res.status(200).json({"status": res.statusCode, "data": result.rows});
          }
        })
        .catch((error) => {
          res.status(500).json({ "status": res.statusCode, "error": "Could not get parcels from database"})
        })
      }
    }

    static getOne(req, res) {
     let id = req.params.id
    if (!req.adminStatus) {
      const query = `SELECT * FROM parcels WHERE ID='${id}'and placedBy='${req.user}'`
      db.query(query)
        .then((result) => {
          if(result.rowCount === 0) {
            return res.status(400).json({ "status": res.statusCode, "error": 'You do not own such parcel delivery order'})
          } else if (result.rowCount >= 1) {
            res.status(200).json({"status": res.statusCode, "data": result.rows[0]});
          }
        })
        .catch((error) => {
          res.status(500).json({ "status": res.statusCode, "error": "Could not get parcels from database"})
        })
      
    } else {
      const query = `SELECT * FROM parcels WHERE ID='${id}'`
      db.query(query)
        .then((result) => {
          if(result.rowCount === 0) {
            return res.status(204).json({ "status": res.statusCode, "error": 'No such parcel'})
          } else if (result.rowCount >= 1) {
            res.status(200).json({"status": res.statusCode, "data": result.rows[0]});
          }
        })
        .catch((error) => {
          res.status(500).json({ "status": res.statusCode, "error": "Could not get parcels from database"})
        })
    }
   }

  static cancel(req, res) {
    const id = req.params.id;
    const newStatus = 'canceled';
    const query = `UPDATE parcels SET status='${newStatus}' WHERE id='${id}' and placedby='${req.user}'`
    db.query(query)
        .then((result) => {
          if(result.rowCount === 0) {
            return res.status(400).json({ "status": 400, "error": 'Only parcel owners can cancel their delivery order'})
          } else if (result.rowCount >= 1) {
            res.status(200).json({"status": 200, "message": "Your parcel delivery order has been cancelled "});
          }
        })
        .catch((error) => {
          res.status(500).json({ "status": 500, "error": "Could not get parcels from database"})
        })
  }

  static changeDestination(req, res) {
    const id = req.params.id;
    const fieldError = destinationSchema(req.body)
    if(fieldError) {
      return res.status(400).json({ "status": 400, "error": fieldError})
    }
    const newDestination = req.body.toAddress
    const query = `UPDATE parcels SET toAddress='${newDestination}' WHERE id='${id}' AND placedby='${req.user}'`
    db.query(query)
    .then((result) => {
      if(result.rowCount === 0) {
        return res.status(204).json({ "status": 204, "error": 'Only parcel owners can change order destination'})
      } else if (result.rowCount >= 1) {
        res.status(200).json({"status": 200, "Message": "The destination has been changed successfully "});
      }
    })
    .catch((error) => {
      res.status(500).json({ "status": 500, "error": "An error ocurred while trying to change the parcel Destination"})
    })
  }

  static changeCurrentLocation(req, res) {
    if (req.adminStatus) {
      const id = req.params.id;
      
      const fieldError = currentLocationSchema(req.body)
      if(fieldError) {
        return res.status(400).json({ "status": 400, "error": fieldError})

      }
      const currentLocation = req.body.currentLocation
      const query = `UPDATE parcels SET toaddress='${currentLocation}' WHERE id='${id}'` 
      db.query(query)
      .then((result) => {
        if(result.rowCount === 0) {
          return res.status(204).json({ "status": 204, "error": 'No such parcel'})
        } else if (result.rowCount >= 1) {
          res.status(200).json({"status": 200, "Message": "The current location of the order has been updated successfully "});
        }
    })
    .catch((error) => {
      res.status(500).json({ "status": 500, "error": "Could not find the parcel in database"})
    })
  } else {
    res.json({"Message": "Only Admins can access this route"})
  }
}

static changeStatus(req, res) {
  if (req.adminStatus) {
    const id = req.params.id;

    const fieldError = changeStatusSchema(req.body)
    if(fieldError) {
      return res.status(400).json({ "status": res.statusCode, "error": fieldError})
    }
    const status = req.body.status
    const query = `UPDATE parcels SET status='${status}' WHERE id='${id}' AND status='pending'` 
    db.query(query)
  .then((result) => {
    if(result.rowCount === 0) {
      return res.status(400).json({ "status": 400, "error": 'This parcel delivery order might have been cancelled or delivered'})
    } else if (result.rowCount >= 1) {
      Helper.sendEmail()
      res.status(200).json({"status": 200, "Message": "The status of the parcel has been changed successfully "});
    }
  })
  .catch((error) => {
    res.status(500).json({ "status": 500, "error": "Could not find the parcel in database"})
  })
} else {
    res.json({"Message": "Only Admins can access this route"})
  }
}
}

export default Parcels;