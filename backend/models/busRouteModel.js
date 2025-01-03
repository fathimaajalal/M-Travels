import mongoose from "mongoose";

const busRouteSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:Array, required:true},
    category: {type:String, required:true},

    departureTime: {type:String},
    arrivalTime: {type:String},
    availableSeats: {type:Number},
    totalSeats: {type:Number},
    seating: {type:String},
    date: {type: Number},
    stops: [
        {
            location: { type: String, required: true },
            time: { type: String, required: true },
        },
    ],
  
})

const busRouteModel = mongoose.models.busRoute || mongoose.model("busRoute",busRouteSchema);

export default busRouteModel