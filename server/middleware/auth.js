import db from '../config'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

class Auth {
  static verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearerArray = bearerHeader.split(" ")
    const bearerToken = bearerArray[1]
    req.token = bearerToken

    jwt.verify(req.token, process.env.SECRET, (err, data) => {
      if (err) {
        res.status(403).send("You cannot access this page because you require a token to access it")
      } else {
          req.user = data.userId
          const query= `SELECT isadmin FROM users where id='${req.user}'`
          db.query(query)
          .then((result) => {
            if (result.rowCount === 0) {
              res.status(400).json({"status": 400, "message": "An error occurred"})
            } else if (result.rowCount >=1 ) {
                req.adminStatus = result.rows[0].isadmin
                next()
            }
          })
          .catch((error) => {
            return res.status(400).json('Something went wrong')
          })
        }
      })
    } else {
      res.status(403).json({"status":403, "message":"Forbidden"})
    }
  }
}

export default Auth;