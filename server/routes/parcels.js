import express from 'express'
import bodyParser from 'body-parser'
import parcels from '../mockdata/parcels'
import Joi from 'joi'
import { pool, dbQuery } from '../config'
import moment from 'moment'
import nodeMailer from 'nodemailer'
import parcelController from '../controllers/parcels'
import Auth from '../middleware/auth'

let router = express.Router();
router.use(express.json())

router.get('/',Auth.verifyToken, parcelController.getAll)
router.get('/:id',Auth.verifyToken, parcelController.getOne)
router.post('/',Auth.verifyToken, parcelController.create)
router.patch('/:id/cancel',Auth.verifyToken, parcelController.cancel)
router.patch('/:id/destination',Auth.verifyToken, parcelController.changeDestination)

router.patch('/:id/currentlocation',Auth.verifyToken, parcelController.changeCurrentLocation)

export default router;