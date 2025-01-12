import { v2 as cloudinary } from "cloudinary"
import busRouteModel from "../models/busRouteModel.js"


// add vehicle
const addVehicle = async (req, res) => {
  try {
      const { name, description, price, category, departureTime, arrivalTime, totalSeats, availableSeats, seating, stops } = req.body;
      
      // Handle image uploads
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

      let imagesUrl = await Promise.all(
          images.map(async (item) => {
              let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
              return result.secure_url;
          })
      );

      // Add the stops data to the vehicle data
      const vehicleData = {
          name,
          description,
          price: Number(price),
          category,
          departureTime,
          arrivalTime,
          availableSeats: Number(availableSeats),
          totalSeats: Number(totalSeats),
          seating,
          stops: stops || [],  // Ensure stops are included
          image: imagesUrl,
          date: Date.now()
      };

      console.log(vehicleData);

      // Save the vehicle data
      const vehicle = new busRouteModel(vehicleData);
      await vehicle.save();

      res.json({ success: true, message: "Vehicle Added" });

  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};

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

// update vehicle
// const updateVehicle = async (req, res) => {
//     try {
//       const { id, name, description, price, category, departureTime, arrivalTime, availableSeats, totalSeats, seating } = req.body
  
//       const updatedVehicle = await busRouteModel.findByIdAndUpdate(
//         id,
//         {
//           name,
//           description,
//           price,
//           category,
//           departureTime,
//           arrivalTime,
//           availableSeats,
//           totalSeats,
//           seating,
//         },
//         { new: true }
//       )
  
//       res.json({ success: true, message: "Vehicle updated successfully", vehicle: updatedVehicle })
//     } catch (error) {
//       console.log(error)
//       res.json({ success: false, message: error.message })
//     }
//   }
const updateVehicle = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      departureTime,
      arrivalTime,
      availableSeats,
      totalSeats,
      seating,
    } = req.body;

    // Handle updated images if provided
    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
          return result.secure_url;
        })
      );
    }

    // Find the vehicle and update its details
    const vehicle = await busRouteModel.findById(id);

    const updatedVehicle = await busRouteModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        departureTime,
        arrivalTime,
        availableSeats,
        totalSeats,
        seating,
        image: imagesUrl.length > 0 ? imagesUrl : vehicle.image, // Update images only if new ones are provided
      },
      { new: true }
    );

    res.json({ success: true, message: "Vehicle updated successfully", vehicle: updatedVehicle });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { listVehicle, addVehicle, removeVehicle, singleVehicle, updateVehicle }