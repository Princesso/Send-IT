import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
    } else {
      res.json({"status": 400, "data": "Only Admin can access this page"})
    }
  }
  // static getOne (req, res) {
  //   if(!req.adminStatus) {
  //     let id = req.params.id
  //     dbQuery('SELECT * FROM users WHERE ID=$1 AND placedBy=$2',[id,req.user], (err, dbres) => {
  //     if (err) {
  //       res.send({ "status": res.statusCode, "error": 'No such User please check the ID again'})
  //     } else {
  //       res.send({"status": res.statusCode, "data": dbres.rows[0]});
  //     }
  //   })
  //   } else {
  //     let id = req.params.id
  //     dbQuery('SELECT * FROM users WHERE ID=$1',[id,req.user], (err, dbres) => {
  //     if (err) {
  //       res.send({ "status": res.statusCode, "error": 'No such User please check the ID again'})
  //     } else {
  //       res.send({"status": res.statusCode, "data": dbres.rows[0]});
  //     }
  //   })
  //   }
  // }
  // static getUserParcels (req, res) {
  // dbQuery('SELECT * FROM parcels WHERE placedBy=$1',[req.user], (err, dbres) => {
  //   if (err) {
  //     res.send({ "status": res.statusCode, "error": 'An error occured while trying to retrieve user parcels'})
  //   } else {
  //     res.send({"status": res.statusCode, "data": dbres.rows});
  //   }
  // })
  // }

}

export default User