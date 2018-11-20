import { pool, dbQuery } from '../database'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const Auth = {
  verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearerArray = bearerHeader.split(" ")
    const bearerToken = bearerArray[1]
    req.token = bearerToken

    jwt.verify(req.token, process.env.SECRET, (err, data) => {
      if (err) {
        res.send("You cannot access this page")
      } else {
          req.user = data.userId
          dbQuery("SELECT isAdmin FROM users where id=$1", [req.user], (err, dbres) => {
            if(err) {
              return res.send('Something went wrong')
            } else {
              req.adminStatus = dbres.rows[0].isadmin
              next()
            }
          })
        }
      })
    } else {
      res.json("Forbidden")
      next()
    }
  }
}

export default Auth;