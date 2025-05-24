import productController from '../controller/Product.js'
import express from 'express'
import Auth from '../common/Auth.js'

const productRouter = express.Router()


productRouter.post('/create',Auth.validate,productController.createProducts)
productRouter.get('/',Auth.validate,productController.getAllProducts)
productRouter.delete('/delete/:id',Auth.validate,Auth.adminGaurd,productController.deleteProductById)
productRouter.put('/edit/:id',Auth.validate,Auth.adminGaurd,productController.editPrdouctById)
productRouter.get('/:id',Auth.validate,productController.getProductById)



export default productRouter
