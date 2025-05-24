import productModel from "../models/ProductModel.js"
import Auth from '../common/Auth.js'

 const percentage = (actPrice,disPrice)=>{
    return  Math.floor((100*disPrice)/actPrice) 

 } 
  
   

const createProducts = async(req,res)=>{
    try {
        const token = await req.headers.authorization?.split(" ")[1]
        if(!token){
            res.status(400).send({message:"token not found"})

        }else{
            const user = await Auth.decodeToken(token)
          if(user.role ==="admin"){
            const  data = req.body
            if(!data){
               res.status(400).send({message:"Product data is require"})
       
            }else{
               const created = await productModel.create(data)
                created.createdBy=user.email
               created.offer = percentage(data.MrpPrice,data.discountPrice)
                created.save()
               
                
               res.status(201).send({message:"Product created successfull",created})
               
       
            }
          }
         }

   
        
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})

    }
}



const getAllProducts = async(req,res)=>{
    try {
        const allProducts = await productModel.find()
        res.status(200).send({message:"Get All Products successfull",allProducts})
        
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})

    }
}


const editPrdouctById = async(req,res)=>{
    try {
        const token = await req.headers.authorization?.split(" ")[1]
        if(!token){
            res.status(400).send({message:"Token not found"})

        }
        const decode = await Auth.decodeToken(token)
        const user = await productModel.findOne({_id:req.params.id})

        if(!user){
            res.status(400).send({message:"Invalid Id"})

        }else{
         
            const editProduct = await productModel.updateOne({_id:req.params.id},{$set:req.body})
            user.modifiedAt=Date.now()
            user.modifiedBy=decode.email
            user.offer = percentage(req.body.MrpPrice,req.body.discountPrice)

            user.save()
          res.status(200).send({message:"Product Get by Id succesfull",editProduct})
        }
        
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})

    }
}



const deleteProductById = async(req,res)=>{
    try {
        const user = await productModel.findOne({_id:req.params.id})
        if(!user){
            res.status(400).send({message:"Invalid Id"})

        }else{
            await productModel.deleteOne({_id:req.params.id})
          res.status(200).send({message:"Product deleted succesfull",user})
        }
        
    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})

    }
}


const getProductById = async(req,res)=>{
    try {
         const user = await productModel.findOne({_id:req.params.id})
        if(!user){
            res.status(400).send({message:"Invalid Id"})

        }else{
          res.status(200).send({message:"Product Get by Id succesfull",user})
        }



    } catch (error) {
        res.status(500).send({message:"Internal Server Error",error:error.message})

    }
}


export default {
    createProducts,
    getAllProducts,
    editPrdouctById,
    deleteProductById,
    getProductById
}


