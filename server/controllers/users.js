import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { pool, dbQuery } from '../database'
import dotenv from 'dotenv'
import Helper from './helper'

dotenv.config();

const User = {
  async create(req, res) {
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
   await dbQuery('INSERT INTO users (firstname,lastname,othernames,email,username,registered,isAdmin,password) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [newUser.firstname,newUser.lastname,newUser.othernames,newUser.email,newUser.username,newUser.registered,newUser.isAdmin,newUser.password],
    (err, dbres) => {
      if(err) {
        res.status(400).send({ "status": res.statusCode, "error": 'An error occured while trying to register you please check the fields again'})
      } else {
        const token = Helper.generateToken(dbres.rows[0].id)
        res.send({"status": res.statusCode, "data": [ {"token": token, "user": dbres.rows[0]}]});
      }
    })
  },
  async login (req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Either email or password is missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Enter a correct email address ' });
    }
    try {
      const loginData = {
        email: req.body.email,
        password: req.body.password,
      }
     await dbQuery('SELECT * FROM users WHERE email=$1',[loginData.email], (err, dbres) => {
        if(err) {
          res.status(400).send({ "status": 500, "error": 'An error occured while trying to log you in Check your details again'})
        } else {
          if(!Helper.comparePassword(dbres.rows[0].password, req.body.password)) {
            return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
          } else {
            const token = Helper.generateToken(dbres.rows[0].id);
            return res.status(200).send({ "token": token, "message": "Login successful" });
          }
        }
      })
    } catch(err) {
      res.send({ "status": 500, "error": 'An error occured while trying to log you in Check your details again'})
    }
  },
  
}

export default User