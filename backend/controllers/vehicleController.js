import { v2 as cloudinary } from "cloudinary"
import busRouteModel from "../models/busRouteModel.js"


// add vehicle
const addVehicle = async(req,res) => {
    try {
        const { name, description, price, category, departureTime, arrivalTime, totalSeats, availableSeats, seating } = req.body
        
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item ) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const vehicleData = {
            name,
            description,
            price: Number(price),
            category,
        
            departureTime,
            arrivalTime,
            availableSeats: Number(availableSeats),
            totalSeats: Number(totalSeats),
            seating ,
            image: imagesUrl,
            date: Date.now()
            // color: JSON.parse(color)
       }

       console.log(vehicleData);

       const vehicle = new busRouteModel(vehicleData);
       await vehicle.save()

        res.json({success: true, message: "Vehicle Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// list vehicle
const listVehicle = async(req,res) => {
    try {
        const vehicles = await busRouteModel.find({});
        res.json({success:true,vehicles})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


// remove vehicle
const removeVehicle = async(req,res) => {
    try {
        await busRouteModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Vehicle removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
// single vehicle info
const singleVehicle = async(req,res) => {
    try {

        const {vehicleId} = req.body
        const vehicle = await busRouteModel.findById(vehicleId)
        res.json({success:true, vehicle})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export { listVehicle, addVehicle, removeVehicle, singleVehicle }
