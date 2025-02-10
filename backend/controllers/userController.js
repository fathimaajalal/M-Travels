import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
// import dotenv from 'dotenv';
// dotenv.config();

const createToken = (id) => {
    const secret = process.env.JWT_SECRET || 'mubarak';
    return jwt.sign({ id }, secret, { expiresIn: '1d' });
    // return jwt.sign({ id }, secret);
};



// User Login Route 
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.json({ success: false, message: "User doesn't exist" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const token = createToken(user._id);
        res.json({ success: true, token });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
  };

// User Registration Route 
const registerUser = async (req,res) => {
    try{
        const {name,email,password} = req.body;

        const exists = await userModel.findOne({email});
        if (exists){
            return res.json({success:false, message: "User already exists"})
        }

        if (!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email."})
        }
        if (password.length < 8){
            return res.json({success:false, message: "Please enter a strong password."})
        }

        // hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})
        
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// User Admin Route 
const adminLogin = async (req,res) => {
     try {

        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
          const token = jwt.sign(email+password,process.env.JWT_SECRET)
          res.json({success:true,token})
        } else {
          res.json({success:false,message:"Invalid Credentials"})
        }

     } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
  }
}


// Import necessary modules
const userProfile = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token to extract user ID
    const userId = decoded.id; // Assuming token has `id`

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { name, email, phone } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const userList = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 }); // Exclude passwords
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'User removed successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {loginUser, registerUser, adminLogin, userProfile, editProfile, changePassword, userList, removeUser}
