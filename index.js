import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import router from "./src/routers/index.js"


dotenv.config()
const App = express()
App.use(express.json())
App.use(cors())

App.use('/',router)


App.listen(8000,()=>console.log("Server listening 8000 Port"))
