import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// import dotenv from 'dotenv';
// import connectDB from './config/mongodb.js';
import { mongoDBURL } from './config/config.js';
import mongoose from 'mongoose';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import vehicleRouter from './routes/vehicleRoute.js';
import bookingRouter from './routes/bookingRoute.js';


// App Config
const app = express();
const port = process.env.PORT || 4000;
// connectDB()
connectCloudinary()

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user' , userRouter)
app.use('/api/vehicle',vehicleRouter)
app.use('/api/booking',bookingRouter)

app.get('/', (req, res) => {
  res.send('API Working');
});

mongoose
.connect(mongoDBURL)
        .then(()=>{
            console.log('App connected to database')
            // Start Server
            app.listen(port, () => {
              console.log(`Server running on port ${port}`);
            });
        })
        .catch((error)=>{
            console.log(error);
        });   