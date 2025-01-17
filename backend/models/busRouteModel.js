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
    stops: {type:Array, required:true},

        // New field for 'Regular' buses
        // stops: [{
        //     stopName: { type: String, required: true },
        //     priceToNextStop: { type: Number, required: true }, // Price from this stop to the next stop
        // }],

  
})

const busRouteModel = mongoose.models.busRoute || mongoose.model("busRoute",busRouteSchema);

export default busRouteModel