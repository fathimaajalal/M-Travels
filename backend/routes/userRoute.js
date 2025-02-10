import express from 'express'
import { userProfile, loginUser, registerUser, adminLogin, editProfile, changePassword, userList, removeUser } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/userprofile',userProfile)
userRouter.put('/editprofile', editProfile);
userRouter.put('/editpassword', changePassword);

userRouter.get('/list', userList);
userRouter.post('/remove', removeUser);

export default userRouter;