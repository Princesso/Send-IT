import express from 'express'
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
router.patch('/:id/status',Auth.verifyToken, parcelController.changeStatus)

export default router;