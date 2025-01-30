import express from 'express'
import {bookVehicle, bookVehicleRazorPay, bookVehicleStripe, allBookings, userBookings, updateStatus, verifyStripe, cancelBooking, subscribeNewsletter} from '../controllers/bookingController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const bookingRouter = express.Router()

// Admin Features
bookingRouter.post('/list',adminAuth,allBookings)
bookingRouter.post('/status',adminAuth,updateStatus)

// Payment Features
bookingRouter.post('/book',authUser,bookVehicle)
bookingRouter.post('/stripe', authUser, bookVehicleStripe);
bookingRouter.post('/verifyStripe', authUser, verifyStripe);


bookingRouter.post('/razorpay',authUser,bookVehicleRazorPay)
bookingRouter.post('/cancel',authUser,cancelBooking)

// User Feature
bookingRouter.post('/userbookings',authUser,userBookings)
bookingRouter.post('/subscribe', authUser, subscribeNewsletter);

export default bookingRouter