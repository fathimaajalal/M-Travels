import express from 'express'
import {bookVehicle, bookVehicleRazorPay, bookVehicleStripe, allBookings, userBookings, updateStatus} from '../controllers/bookingController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const bookingRouter = express.Router()

// Admin Features
bookingRouter.post('/list',adminAuth,allBookings)
bookingRouter.post('/status',adminAuth,updateStatus)

// Payment Features
bookingRouter.post('/book',authUser,bookVehicle)
bookingRouter.post('/stripe',authUser,bookVehicleStripe)
bookingRouter.post('/razorpay',authUser,bookVehicleRazorPay)

// User Feature
bookingRouter.post('/userbookings',authUser,userBookings)

export default bookingRouter
