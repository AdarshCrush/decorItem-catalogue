import express from "express";
import userRouter from "./User.js"
import productRouter from "./ProductRouter.js";
const Router = express.Router()

Router.use('/user',userRouter)
Router.use('/product',productRouter)

 // Router.use('/dashboard')

export default Router