import express from 'express'
import bodyParser from 'body-parser'
import parcels from '../mockdata/parcels'
import Joi from 'joi'
import { pool, dbQuery } from '../database'
import moment from 'moment'
import nodeMailer from 'nodemailer'
import parcelsFromDatabase from '../controllers/parcels'
import Auth from '../middleware/auth'

let router = express.Router();
router.use(express.json())

router.get('/',Auth.verifyToken, parcelsFromDatabase.getAll)
router.get('/:id',Auth.verifyToken, parcelsFromDatabase.getOne)
router.post('/',Auth.verifyToken, parcelsFromDatabase.create)
router.patch('/:id/cancel',Auth.verifyToken, parcelsFromDatabase.cancel)
router.patch('/:id/destination',Auth.verifyToken, parcelsFromDatabase.changeDestination)

router.patch('/:id/currentlocation',Auth.verifyToken, parcelsFromDatabase.changeCurrentLocation)

export default router;