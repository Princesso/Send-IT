import express from 'express'
import bodyParser from 'body-parser'
import Joi from 'joi'
import users from '../mockdata/users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { pool, dbQuery } from '../database'
import dotenv from 'dotenv'
import UsersFromDatabase from '../controllers/users'

dotenv.config();

let router = express.Router();
router.use(express.json())

router.post('/signup', UsersFromDatabase.create)

router.post('/login', UsersFromDatabase.login)

export default router