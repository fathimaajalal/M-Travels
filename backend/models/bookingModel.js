import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    vehicle: {type: String, required: true},
    image: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true, default: 'Booking Successful'},
    paymentMethod: {type: String, required: true},
    payment: {type: Boolean, required: true, default: false},
    // bookDate: {type: Number, required: true },
    // date: {type: Number, required: true }
    bookDate: { type: Date, required: true },
date: { type: Date, required: true, default: Date.now },

})

const bookingModel = mongoose.models.booking || mongoose.model('booking',bookingSchema)
export default bookingModel