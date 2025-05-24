import mongoose from "./index.js";


const productSchema = new mongoose.Schema({
          title:{ type:String, required :[true,"Product Title is require"] },
          description:{  type:String, required:[true,"Product Description is require"]},
           imageUrl:{ type:String,required:[true,'Image Url is require'] },
          MrpPrice:{type:Number, required:[true,"MRP Price is require"]},
          discountPrice:{type :Number, required:[true,'Product Discount Price is require']},
          size:{type:String,required:[true,"Product Size is require"]},
          category:{type:String,required:[true,"Product Category is required"]},
          offer:{type:Number, default:0,required:[true,"Product Offer percentage is required"]},
          createdBy:{type:String,default:""},
          modifiedBy:{type:String,default:""},
          modifiedAt:{type:Date},
          createdAt:{type:Date,default: Date.now()}
 },{
     collection:"Product-data",
     versionKey:false
 })


 const productModel = mongoose.model("Products-data",productSchema)

 export default productModel