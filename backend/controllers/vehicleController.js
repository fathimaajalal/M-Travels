import { v2 as cloudinary } from "cloudinary";
import busRouteModel from "../models/busRouteModel.js";
import NewsletterModel from "../models/newsletterModel.js"; // Import the newsletter model
import nodemailer from "nodemailer";

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
      // stops
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
const updateVehicle = async (req, res) => {
  try {
    const {
      id, name, description, price, category, departureTime, arrivalTime, availableSeats, totalSeats, seating, stops
    } = req.body;

    // Handle updated images if provided
    const images = ['image1', 'image2', 'image3', 'image4'].map(imageField => req.files?.[imageField]?.[0]).filter(Boolean);
    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      }));
    }

    // Find the vehicle and update its details
    const vehicle = await busRouteModel.findById(id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Vehicle not found" });
    }

    // Update vehicle data
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
        stops
      },
      { new: true }
    );

    res.json({ success: true, message: "Vehicle updated successfully", vehicle: updatedVehicle });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Send Newsletter
const sendNewsletter = async (req, res) => {
  try {
    const { subject, content } = req.body;

    // Fetch all subscribed emails
    const subscribers = await NewsletterModel.find({}, "email");

    if (subscribers.length === 0) {
      return res.json({ success: false, message: "No subscribers found." });
    }
    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      subject: subject, // Email subject
      html: content, // Email content (HTML format)
    };

    // Send emails to all subscribers
    for (const subscriber of subscribers) {
      mailOptions.to = subscriber.email;
      await transporter.sendMail(mailOptions);
    }

    res.json({ success: true, message: "Newsletter sent successfully!" });
  } catch (error) {
    console.error("Error sending newsletter:", error);
    res.json({ success: false, message: "Failed to send newsletter." });
  }
};

export {
  listVehicle,
  addVehicle,
  removeVehicle,
  singleVehicle,
  updateVehicle,
  sendNewsletter,
};