import express from 'express'
import dotenv from 'dotenv'
import userController from '../controllers/users'

dotenv.config();

let router = express.Router();
router.use(express.json())

router.post('/signup', userController.signup)
router.post('/login', userController.login)

export default router