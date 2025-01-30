import bookingModel from "../models/bookingModel.js";
import userModel from '../models/userModel.js'
import razorpay from 'razorpay'
import Stripe from 'stripe'
import crypto from 'crypto';
import { log } from "console";
import stripePackage from 'stripe';

const currency = 'INR';

// gateway initialize
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY || 'sk_test_51QgVPICFAXPrvo468mqr2TNx7HY1rdpxhCVO5vmQQ8x9XxDUI3n3HdCAyZUlDP5jP72aKlic2BpxrTFRIGsQdIHx003gQEOB8C');
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// booking by poa
const bookVehicle = async (req, res) => {
    try {
        const { userId, vehicle, firstName, lastName, phone, amount, image, bookDate, fromStop, toStop } = req.body;
        const bookingData = {
            userId,
            firstName,
            lastName,
            phone,
            vehicle,
            amount,
            paymentMethod: "COD",
            payment: false,
            image,
            bookDate: new Date(bookDate), // Convert to Date object
            date: Date.now(),
            fromStop,
            toStop
        };


        const newBooking = bookingModel(bookingData)
        await newBooking.save()

        res.json({ success: true, message: "Booking Successful" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Book Vehicle and Create Stripe Session
const bookVehicleStripe = async (req, res) => {
    try {
        const { userId, vehicle, firstName, lastName, phone, amount, image, bookDate, fromStop, toStop } = req.body;

        const validBookDate = new Date(bookDate);
        if (isNaN(validBookDate)) {
            return res.status(400).json({ success: false, message: 'Invalid book date format' });
        }

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: vehicle,
                            images: [image],
                        },
                        unit_amount: amount * 100, // Stripe expects amount in paise
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/booking/cancel`,
            metadata: {

                firstName,
                lastName,
                phone,
                paymentMethod: "Stripe" || "stripe",


                userId,
                vehicle,
                bookDate,
                fromStop,
                toStop,

                image,

                // bookDate: new Date(bookDate), // Convert to Date object
                bookDate: validBookDate.toISOString(),
                date: Date.now(),
                fromStop,
                toStop
            },
        });

        // Send the session ID to the frontend to redirect to Stripe's checkout page
        res.json({ success: true, sessionId: session.id });

    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Verify Payment
const verifyStripe = async (req, res) => {

    console.log('inside verify stripe');

    try {
        const { sessionId } = req.body;

        // Retrieve the session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {

            console.log('inside paid');
            // Payment is successful; save the booking details in the database
            const { userId, vehicle, firstName, lastName, phone, amount, image, bookDate, fromStop, toStop } = session.metadata;

            const validBookDate = new Date(bookDate);
            if (isNaN(validBookDate)) {
                return res.status(400).json({ success: false, message: 'Invalid book date format from 2nd, verifyStripe' });
            }

            await bookingModel.create({

                firstName,
                lastName,
                phone,

                paymentMethod: "Stripe" || "stripe",

                userId,
                vehicle,
                bookDate,
                fromStop,
                toStop,
                payment: true,
                paymentId: session.id,
                amount: session.amount_total / 100, // Convert back to original currency

                image,
                // bookDate: new Date(bookDate), // Convert to Date object

                bookDate: validBookDate,
                // bookDate, 
                date: Date.now(),
                fromStop,
                toStop
            });

            res.status(200).json({ success: true, message: 'Payment verified and booking saved' });
        } else {
            res.status(400).json({ success: false, message: 'Payment not completed' });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Inside verifyRazorpay

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            const booking = await bookingModel.findOne({ orderId: razorpay_order_id });
            if (!booking) {
                return res.status(404).send('Booking not found');
            }

            await bookingModel.findByIdAndUpdate(booking._id, { payment: true, paymentId: razorpay_payment_id });

            res.json({ success: true, message: 'Payment Verified', redirectUrl: `/bookings` });
        } else {
            res.status(400).send('Payment verification failed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const bookVehicleRazorPay = async (req, res) => {
    try {
        const { userId, vehicle, firstName, lastName, phone, amount, image, bookDate, fromStop, toStop } = req.body;

        const validBookDate = new Date(bookDate);
        if (isNaN(validBookDate)) {
            return res.status(400).json({ success: false, message: 'Invalid book date format' });
        }

        // Create Razorpay order
        const order = await razorpayInstance.orders.create({
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: { userId, vehicle, firstName, lastName, phone, amount, image, validBookDate, fromStop, toStop }, // Add stops to notes
        });

        // Save booking to the database with payment status as "Pending"
        const bookingData = {
            userId,
            firstName,
            lastName,
            phone,
            vehicle,
            amount,
            paymentMethod: 'Razorpay',
            payment: false,
            image,
            date: Date.now(),
            orderId: order.id,
            bookDate: validBookDate.toISOString(),
            fromStop,
            toStop
        };

        const newBooking = new bookingModel(bookingData);
        await newBooking.save();

        res.json({
            success: true,
            orderId: order.id,
            key: process.env.RAZORPAY_KEY_ID, // Send Razorpay key ID to frontend
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// All bookings for admin panel
const allBookings = async (req, res) => {
    try {

        const bookings = await bookingModel.find({})
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// frontend booking data
const userBookings = async (req, res) => {

    try {

        const { userId } = req.body

        const bookings = await bookingModel.find({ userId })
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// update booking status from Admin Panel
const updateStatus = async (req, res) => {

    try {
        const { bookingId, status } = req.body;

        await bookingModel.findByIdAndUpdate(bookingId, { status })
        res.json({ success: true, message: 'Status Updated' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// Cancel Booking
const cancelBooking = async (req, res) => {
    try {
        const { bookingId, paymentMethod, paymentId } = req.body;

        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // Update the booking status to "Canceled"
        await bookingModel.findByIdAndUpdate(bookingId, { status: "Canceled" });

        // Handle refunds if necessary
        if (paymentMethod === "Stripe" && booking.payment) {
            await stripe.refunds.create({
                payment_intent: paymentId,
            });
        } else if (paymentMethod === "Razorpay" && booking.payment) {
            await razorpayInstance.payments.refund(paymentId, {
                amount: booking.amount * 100, // Refund amount in paise
            });
        }

        res.json({ success: true, message: "Booking canceled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to cancel booking" });
    }
};


const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email is already registered in the database
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            // If the email is registered, notify the user
            return res.json({ success: true, message: "You have already subscribed and are eligible for the discount.", discountCode: '' });
        } else {
            // If the email is not registered, create a new entry in the user model
            const newUser = new userModel({ email });
            await newUser.save();

            // Generate a discount code
            const discountCode = `DISCOUNT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

            // Return the discount code to the user
            return res.json({
                success: true,
                message: "Subscription successful! You are eligible for the discount.",
                discountCode: discountCode
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export { verifyStripe, verifyRazorpay, bookVehicle, bookVehicleRazorPay, bookVehicleStripe, allBookings, userBookings, updateStatus, cancelBooking, subscribeNewsletter }