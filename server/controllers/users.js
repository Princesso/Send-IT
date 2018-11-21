import moment from 'moment'
import db from '../config'
import dotenv from 'dotenv'
import Helper from './helper'

dotenv.config();

class User {
  static signup(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashedPassword = Helper.hashPassword(req.body.password);

    let newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othernames: req.body.othernames,
      email: req.body.email,
      username: req.body.username,
      registered: moment(new Date()),
      isAdmin: 'false',
      password: hashedPassword
    };
    const query = `INSERT INTO users (firstname,lastname,othernames,email,username,registered,isAdmin,password) 
                    VALUES('${newUser.firstname}','${newUser.lastname}','${newUser.othernames}','${newUser.email}','${newUser.username}',
                    '${newUser.registered}','${newUser.isAdmin}','${newUser.password}')`
    db.query(query)
    .then((result) => {
      if(result.rowCount >=1) {
        res.json({"status":200,"message":"User saved successfully"})
      } else if (result.rowCount === 0) {
        res.json({"staus": 400, "message": "The user could not be saved"})
      }
    })
    .catch((error)=>{
      res.json({"staus": 400, "message": "An error occured while trying to save user"})
    })
  }

  static login (req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Either email or password is missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Enter a correct email address ' });
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
              const token = Helper.generateToken(result.rows[0].id);
              return res.status(200).json({ "token": token, "message": "Login successful" });
            }
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(400).json({ "status": 400, "error": 'An error occured while trying to log you in Check your details again'})
      })
  }

  static getAll (req, res) {
    const query = 'SELECT * FROM users'
    if(req.isAdmin){
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.json({"status": 400, "message": "No Users Found"})
        } else if (result.rowCount >=1 ) {
            res.json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(400).json({"status": 400, "message":"An error occurd when trying to get users from database"})
      })
    } else {
      res.json({"status": 400, "data": "Only Admin can access this page"})
    }
  }
  static getOne (req, res) {
    let id = req.params.id
    if(!req.adminStatus) {
      const query = `SELECT * FROM users WHERE ID='${id}' AND placedBy='${req.user}'`
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.json({"status": 400, "message": "No Such User Found"})
        } else if (result.rowCount >=1 ) {
            res.json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(400).json({"status": 400, "message":"An error occurd when trying to get user from database"})
      })   
    } else {
      const query = `SELECT * FROM users WHERE ID='${id}'`
      db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.json({"status": 400, "message": "No Such User Found"})
        } else if (result.rowCount >=1 ) {
            res.json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(400).json({"status": 400, "message":"An error occurd when trying to get user from database"})
      })
    }
  }
  static getUserParcels (req, res) {
    const query = `SELECT * FROM parcels WHERE placedBy='${req.user}'`
    db.query(query)
      .then((result) => {
        if (result.rowCount ===0) {
          res.status(400).json({"status": 400, "message": "User has no parcel delivery orders"})
        } else if (result.rowCount >=1 ) {
            res.status(200).json({"status": 200, "data": result.rows})
        }
      })
      .catch((error) => {
        res.status(400).json({"status": 400, "message":"An error occurd when trying to get user parcels from database"})
      })
  }
}

export default User