import express from 'express'
import { listVehicle, addVehicle, removeVehicle, singleVehicle, updateVehicle } from '../controllers/vehicleController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const vehicleRouter = express.Router();

vehicleRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addVehicle);
vehicleRouter.post('/remove',adminAuth,removeVehicle);
vehicleRouter.post('/single',singleVehicle);
vehicleRouter.get('/list',listVehicle);
vehicleRouter.post('/update', adminAuth, updateVehicle)


export default vehicleRouter
