import React, { useState } from 'react'
import axiosService from '../../common/AxiosService'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Formik } from 'formik';
import UseLogout from '../../hooks/UseLogout';
 
function CreateProduct() {
  const logout = UseLogout()
 const UserSchema = Yup.object().shape({
    title : Yup.string().required('*Required') ,
      imageUrl:Yup.string().required("*Required").min(8,'minimum 8 characters') ,
       MrpPrice :Yup.number().required('*Required') ,
      category : Yup.string().required('*Required') ,
      description : Yup.string().required('*Required').max(400,'Enter below 100 characters') ,
      discountPrice : Yup.number().required('*Required') ,
       size : Yup.string().required('*Required') ,
    })
const navigate = useNavigate()

const handleSubmit = async(values)=>{
  try {
    const res = await axiosService.post('/product/create',values)
    console.log(values);
    
    if(res.status === 201){
      toast.success(res.data.message)
   navigate('/home')
    }else{
      toast.error(res.data.message)
     }
  } catch (error) {
          toast.error(error.response.data.message || "error accoured")
          logout()
   }
}
  return  <>
  <div className='container-fluid create-img'>
    <div  className='img-body mt-3'>
      <h3>Create Blog !</h3>
          <Formik initialValues={{
      title:"",imageUrl:"" ,MrpPrice:"",category:"",description:"",discountPrice:""  ,size:""
          }}
          validationSchema={UserSchema}
          onSubmit={ handleSubmit}
          >
          {({errors,touched,handleBlur,handleSubmit,handleChange})=>(
          <Form  onSubmit={handleSubmit}>
         
          <Form.Group className="mb-1"  >
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" onBlur={handleBlur} onChange={handleChange} placeholder="Enter your Title Name"  />
          {errors.title && touched.title ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.title}</div>: null} 
          </Form.Group>

          <Form.Group className="mb-1"  >
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="text" name='imageUrl'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter your image Url"   />
          {errors.imageUrl && touched.imageUrl ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.imageUrl}</div> : null} 

          </Form.Group>
     

          <Form.Group className="mb-1"  >
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name='description'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter Blog Description"   />
          {errors.description && touched.description ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.description}</div> : null} 

          </Form.Group>
 
     
                  
          <Form.Group className="mb-1"  >
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" name='category'  onBlur={handleBlur} onChange={handleChange}>
      <option  >Select the Category</option>
      <option value="Wedding">Wedding Decoration</option>
      <option value="Birthday">Birthday Decoration</option>
      <option value="Housewarming">HouseWarming Decoration</option>
    </Form.Select>
           {errors.category && touched.category ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.category}</div> : null} 
        </Form.Group>    
            
 
          <div className='d-flex gap-3'>
          <Form.Group className="mb-1"  >
          <Form.Label>Actual  Price</Form.Label>
          <Form.Control type="text" name='MrpPrice'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter the Actual price"   />
          {errors.MrpPrice && touched.MrpPrice ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.MrpPrice}</div> : null} 

          </Form.Group>
          <Form.Group className="mb-1"  >
          <Form.Label>DiscountPrice</Form.Label>
          <Form.Control type="text" name='discountPrice'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter your Discount price"   />
          {errors.discountPrice && touched.discountPrice ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.discountPrice}</div> : null} 
           </Form.Group>
           <Form.Group className="mb-3"  >
          <Form.Label>Size</Form.Label>
          <Form.Control type="text" name='size'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter the Size"   />
          {errors.size && touched.size ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.size}</div> : null} 
           </Form.Group>
         
       
</div>
  

         
           
           <Button variant="warning" size="lg p-2"  type='submit' >
          Create
          </Button>
        
          
          </Form>
          )}

          </Formik>
  
    </div>
 
  </div></>
}

export default CreateProduct