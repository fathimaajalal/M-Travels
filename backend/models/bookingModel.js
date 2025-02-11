import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: Number, required: true},
    vehicle: {type: String, required: true},
    image: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, required: true, default: 'Booking Successful'},
    paymentMethod: {type: String, required: true},
    payment: {type: Boolean, required: true, default: false},
    bookDate: { type: Date, required: true },
    date : { type: Date, required: true, default: Date.now },
    fromStop: {type: String},
    toStop: {type: String},
    
    email: {type: String},

})

// const bookingSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     vehicle: { type: String, required: true },
//     price: { type: Number, required: true },
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     phone: { type: String, required: true },
//     image: { type: String, required: true },
//     amount: { type: Number, required: true },
//     bookDate: { type: Date, required: true },
//     fromStop: { type: String, required: true },
//     toStop: { type: String, required: true },
//     paymentMethod: { type: String, required: true },
//     payment: { type: Boolean, default: false },
//     paymentId: { type: String },
//     // discountCode: { type: String }, // Add this field
//   });

const bookingModel = mongoose.models.booking || mongoose.model('booking',bookingSchema)
export default bookingModel