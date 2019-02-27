import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import swagger from "swagger-ui-express";
import swaggerDocument from "../swagger.js";

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
app.use('/api/v1/parcels', parcelRoute)
app.use('/api/v1/users', userRoute)
app.use("/docs", swagger.serve, swagger.setup(swaggerDocument));

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'Welcome to Send-It API.'});
});

app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 4000;

const server = app.listen(port, () => console.log(`app Running on ${port}`));

process.on('exit', () => server.close())
process.on('SIGTERM', () => server.close())
process.on('uncaughtException', () => server.close())

export default app;