import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import jwt from 'jsonwebtoken'

let app = express();

import parcelRoute from './routes/parcels'
import userRoute from './routes/users'
import authRoute from './routes/auth'

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }))


app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/api/v1/auth', authRoute)

//middleware to ensure routes are authenticated before they are acessed. Always put a middleware only above routes you want to work with so that it isn't an overkill
app.use( (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined') {
    const bearerArray = bearerHeader.split(" ")
    const bearerToken = bearerArray[1]
    req.token = bearerToken

    jwt.verify(req.token, process.env.SECRET, (err, data) => {
      if (err) {
        res.send("You cannot access this page")
      } else {
        console.log(" I got to the middleware ")
      }
    })
  } else {
    res.json("Forbidden")
  }
  next()
})

app.use('/api/v1/parcels', parcelRoute)
app.use('/api/v1/users', userRoute)

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'Welcome to Send-It API'});
});

app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 8080;

const server = app.listen(port, () => console.log(`app Running on ${port}`));

process.on('exit', () => server.close())
process.on('SIGTERM', () => server.close())
process.on('uncaughtException', () => server.close())

export default app;