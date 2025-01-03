import bookingModel from "../models/bookingModel.js";

// booking by cod
const bookVehicle = async(req,res) => {
    try {
        const {userId, vehicle, amount} = req.body;
        const bookingData = {
            userId,
            vehicle,
            amount,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        const newBooking = bookingModel(bookingData)
        await newBooking.save()

        res.json({success:true, message:"Booking Successful"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// booking by Stripe
const bookVehicleStripe = async(req,res) => {
    
}

// booking by Razor Pay
const bookVehicleRazorPay = async(req,res) => {
    
}

// All bookings for admin panel
const allBookings = async(req,res) => {
    
}

// frontend booking data
const userBookings = async(req,res) => {
    
}

// update booking status from Admin Panel
const updateStatus = async(req,res) => {
    
}

export {bookVehicle, bookVehicleRazorPay, bookVehicleStripe, allBookings, userBookings, updateStatus}