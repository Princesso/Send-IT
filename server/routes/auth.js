import express from 'express'
import bodyParser from 'body-parser'
import Joi from 'joi'
import users from '../mockdata/users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { pool, dbQuery } from '../database'
import dotenv from 'dotenv'

dotenv.config();

let router = express.Router();
router.use(express.json())

router.post('/signup', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8)
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
  dbQuery('INSERT INTO users (firstname,lastname,othernames,email,username,registered,isAdmin,password) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
  [newUser.firstname,newUser.lastname,newUser.othernames,newUser.email,newUser.username,newUser.registered,newUser.isAdmin,newUser.password],
  (err, dbres) => {
    if(err) {
      console.log(err)
      res.send({ "status": res.statusCode, "error": 'An error occured while trying to register you'})
      pool.end()
    } else {
      const token = jwt.sign(newUser, process.env.SECRET, {
        expiresIn: 84600
      });
      res.send({"status": res.statusCode, "data": [ {"token": token, "user": dbres.rows[0]}]});
    }
  })
});

router.post('/login', (req, res) => {
  try {
    const loginData = {
      email: req.body.email,
      password: req.body.password,
    }
    dbQuery('SELECT * FROM users WHERE email=$1',[loginData.email], (err, dbres) => {
      if(err) {
        res.send({ "status": 500, "error": 'An error occured while trying to log you in Check your details again'})
      } else {
        if (dbres.rows.length < 1) {
          return res.send({ "status": res.statusCode, "error": 'User not found'})
        }
        const dbpassword = dbres.rows[0].password
        if (bcrypt.compareSync(loginData.password, dbpassword)) {
          const token = jwt.sign(loginData, process.env.SECRET, {
            expiresIn: 84600
          });  
          res.send({"status": 200, "data": [{"token":token, "User":dbres.rows[0]}]})       
        } else {
            res.send({"status": 404, "error": "Password mismatch"})
        }
      }
    })
  } catch(err) {
    console.log(err)
    res.send({ "status": 500, "error": 'An error occured while trying to log you in Check your details again'})
  }
})

export default router