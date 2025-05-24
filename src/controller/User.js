import userModel from '../models/UserModel.js'
import Auth from '../common/Auth.js'
import nodemailer from 'nodemailer'
 


const createUser = async(req,res)=>{
    try {
  
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
          req.body.password = await Auth.hashPassword(req.body.password)
         const data = await userModel.create(req.body)

         res.status(201).send({message:"User Created sucessfull",data})

        }else{
            res.status(400).send({message:"Email already exists"})
        }
      
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
    }
}


const getAllUsers = async(req,res)=>{
    try {
        const users = await userModel.find({},{password:0})
        res.status(200).send({message:"Data fetched sucessfull",users})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
    }
}



const userLogin = async(req,res)=>{
    try {
         const user = await userModel.findOne({email:req.body.email})
        if(!user){
            res.status(400).send({message:"Email Not exists"})
        }else{
            const compare = await Auth.comparePassword(req.body.password,user.password)
            if(compare){
               const token = await Auth.createToken({
                    fristName :user.firstName,
                    lastName:user.lastName,
                    email : user.email,
                    role : user.role
                })
                res.status(200).send({message:'Login Successfull',token,user})
            }else{
                res.status(400).send({message:"Password Wrong"})
            }
        }
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
 
    }
}


const forgotPassword = async(req,res)=>{
    try {
        const {email}=req.body
       const user  = await userModel.findOne({email:email})
       if(!user){
       return res.status(400).send({message:"User Not Found"})

       }else{
        const token = await Auth.createToken({email})
         
        const createMail = nodemailer.createTransport({
        service:"gmail",
        secure:true,
        auth:{
            user:process.env.USER_MAIL,
            pass:process.env.USER_PWD
        }
        })

        const emailLink = {
            from :"mernproject963@gmail.com",
            to :email,
            subject:"Password Reset",
            text :`Click this link and reset your password      ${process.env.USER_URL}/${token}`
        }


      await createMail.sendMail(emailLink,(error,info)=>{
        if (error) {
            return console.log('Error sending email:', error);
          }
          return res.status(200).send({message:"Password reset link send to your mail successfull",info})

      })



       }

    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
    }
}


const resetPassword = async(req,res)=>{
    try {
        const {token} = req.params
        const {password} = req.body
        if(!password){
             res.status(400).send({message:"Password required"})

        }else{
            const decode = await Auth.verifyToken(token)
            const user = await userModel.findOne({email:decode.email})
            if(!user){
                 res.status(400).send({message:"Email does not exists"})
               
            }else{
                const hash = await Auth.hashPassword(password)
                user.password=hash
                user.save()
                return res.status(200).send({message:"Reset Sucessfull"})

             }
            
        }
    
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})
    }
}




export default {
    createUser,
    getAllUsers,
    userLogin,
    forgotPassword,
    resetPassword
}