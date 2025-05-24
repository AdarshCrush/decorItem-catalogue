import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


const hashPassword = async(password)=>{
    const gensalt = await bcrypt.genSalt(Number(process.env.SALT_ROUND))
    const hashed = await bcrypt.hash(password,gensalt)
    return hashed
}

const comparePassword = async(password,hash)=>{
    const verify = await bcrypt.compare(password,hash)
    return verify
}

const createToken = async(payload)=>{
    const token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"1hr"
    })
    return token
}

const verifyToken = async(token)=>{
    const verified = await jwt.verify(token,process.env.JWT_SECRET)
    return verified
}

const decodeToken = async(token)=>{
    const payload = await jwt.decode(token)
    return payload
}


const validate = async(req,res,next)=>{
    const token = await req.headers.authorization?.split(" ")[1]


   if(token){
    const newDate = (+new Date())/1000
    const user = await decodeToken(token)
    if(newDate<user.exp){
        next()
    }else{
        res.status(400).send({message:"Token Expired"})
    }
   }else{
    res.status(400).send({message:"Token Not Found"})
   }
 }
 
const adminGaurd = async(req,res,next)=>{
    const token = await req.headers.authorization?.split(" ")[1]


   if(token){
     const user = await decodeToken(token)
     if(user.role ==="admin"){
        next()
     }else{
        res.status(400).send({message:"you are not a Admin"})
     }
   }else{
    res.status(400).send({message:"Token Not Found"})
   }
 }


export default {
    hashPassword,
    comparePassword,
    createToken,
    decodeToken,
    verifyToken,
    validate,
    adminGaurd
}