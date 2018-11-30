import moment from 'moment'
import db from '../config'
import dotenv from 'dotenv'
import Helper from '../helpers/helper'
import {
  signUpSchema,
  loginSchema
} from '../helpers/validator'

dotenv.config();

class User {
  static signup(req, res) {
    if (!req.body.email || !req.body.password || req.body.password.length<1) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashedPassword = Helper.hashPassword(req.body.password);
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othernames: req.body.othernames,
      email: req.body.email,
      username: req.body.username,
      registered: moment(new Date()),
      isAdmin: 'false',
      password: hashedPassword
    };
    const fieldError = signUpSchema(newUser)
    if (fieldError) {
      return res.status(500).send({'message': fieldError})
    }
    const query = `INSERT INTO users (firstname,lastname,othernames,email,username,registered,isAdmin,password) 
                    VALUES('${newUser.firstname}','${newUser.lastname}','${newUser.othernames}','${newUser.email}','${newUser.username}',
                    '${newUser.registered}','${newUser.isAdmin}','${newUser.password}')`
    db.query(query)
    .then((result) => {
      if(result.rowCount >=1) {
        res.status(200).json({"status":200,"message":"User saved successfully"})
      } else if (result.rowCount === 0) {
        res.status(500).json({"staus": 500, "message": "The user could not be saved"})
      }
    })
    .catch((error)=>{
      console.log(error)
      res.status(500).json({"status": 500, "message": "An error occured while trying to save user"})
    })
  }

  static login (req, res) {
    if (loginSchema(req.body)) {
      return res.status(400).send({'message': 'Either email or password is missing or incorrect'});
    }
      const loginData = {
        email: req.body.email,
        password: req.body.password,
      }
      const query = `SELECT * FROM users WHERE email='${loginData.email}'`
      db.query(query)
      .then((result) => {
        if(result.rowCount ==0) {
          res.status(400).json({ "status": 400, "error": 'An error occured while trying to log you in Check your details again'})
        } else if (result.rowCount >=1) {
            if(!Helper.comparePassword(result.rows[0].password, req.body.password)) {
              return res.status(400).json({ 'message': 'The credentials you provided are incorrect' });
            } else {
              loginData.userId=result.rows[0].id
              loginData.isAdmin=result.rows[0].isadmin
              delete(loginData.password)
              const token = Helper.generateToken(loginData);
              return res.status(200).json({ "token": token, "message": "Login successful" });
            }
        }
      })
      .catch((error) => {
        console.log("The login error", error)
        res.status(500).json({ "status":500, "error": 'An error occured while trying to log you in Check your details again'})
      })
  }

  static getAll (req, res) {
    const query = 'SELECT * FROM users'
    if(req.adminStatus){
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.status(204).json({"status": 204, "message": "No Users Found"})
        } else if (result.rowCount >=1 ) {
            res.json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(500).json({"status": 500, "message":"An error occurd when trying to get users from database"})
      })
    } else {
      res.status(403).json({"Message": "Only Admins can access this route"})
    }
  }
  static getOne (req, res) {
    let id = req.params.id
    if(req.adminStatus) {
      const query = `SELECT * FROM users WHERE ID='${id}'`
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.status(204).json({"status": 204, "message": "No Such User Found"})
        } else if (result.rowCount >=1 ) {
            res.json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(500).json({"status": 500, "message":"An error occurd when trying to get user from database"})
      })   
    } else {
      res.status(403).json({"status": 403, "message":"This is an admin functionality"})
    }
  }
  static getUserParcels (req, res) {
    const id = req.params.id
    if(req.adminStatus) {
      const query = `SELECT * FROM parcels WHERE placedBy='${id}'`
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.status(400).json({"status": 400, "message": "User has no parcel delivery orders"})
        } else if (result.rowCount >=1 ) {
            res.status(200).json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(500).json({"status": 500, "message":"An error occurd when trying to get user parcels from database"})
      })
    } else {
      res.status(403).json({"Message": "Only Admins can access this route"})
    }
  }
  static makeAdmin(req, res) {
    if (req.adminStatus) {
      const id = req.params.id;
      const adminstatus = true
      const query = `UPDATE users SET isadmin='${adminstatus}' WHERE id='${id}' RETURNING *` 
      db.query(query)
      .then((result) => {
        if(result.rowCount === 0) {
          return res.status(204).json({ "status": 204, "error": 'No such User'})
        } else if (result.rowCount >= 1) {
          res.status(200).json({"status": 200, "Message": "The user has been made an Admin successfully "});
        }
      })
      .catch((error) => {
        res.status(500).json({ "status": 500, "error": "An error occured while trying to make user an Admmin, try again"})
      })
  } else {
    res.status(403).json({"Message": "Only Admins can access this route"})
    }
  }
}

export default User