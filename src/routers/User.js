import express from 'express'
import UserController from '../controller/User.js'
import Auth from '../common/Auth.js'
const userRouter = express.Router()

userRouter.post('/create',UserController.createUser)
userRouter.get('/',Auth.validate,Auth.adminGaurd,UserController.getAllUsers)
userRouter.post('/login',UserController.userLogin)
userRouter.post('/forgot-password',UserController.forgotPassword)
userRouter.post('/reset-password/:token',UserController.resetPassword)





export default userRouter