import express from 'express'
import Auth from '../middleware/auth'
import UsersFromDatabase from '../controllers/UsersController'

let router = express.Router();
router.use(express.json())

router.get('/', UsersFromDatabase.getAll);
router.get('/:id',Auth.verifyToken,UsersFromDatabase.getOne);
router.get('/:id/parcels',Auth.verifyToken,UsersFromDatabase.getUserParcels )
router.get('/:id/makeadmin',Auth.verifyToken,UsersFromDatabase.makeAdmin)

export default router;