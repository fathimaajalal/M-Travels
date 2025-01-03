import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    vehicle: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true, default: 'Booking Successful'},
    paymentMethod: {type: String, required: true},
    payment: {type: Boolean, required: true, default: false},
    date: {type: Number, required: true }
})

const bookingModel = mongoose.models.booking || mongoose.model('booking',bookingSchema)
export default bookingModel