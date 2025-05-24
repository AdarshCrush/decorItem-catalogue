import { Formik } from 'formik';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
 import * as Yup from 'yup';
import axiosService from '../../common/AxiosService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
  const navigate = useNavigate()
  const UserSchema = Yup.object().shape({
    email:Yup.string().required("* Required").email("Enter the valid email"),
 })
const handleSubmit=async(values)=>{
  try {
  const res= await axiosService.post('/user/forgot-password',values)
     if(res.status === 200){
 
       toast.success(res.data.message)
       navigate('/login')
   
     }else{
       toast.error(users.data.message)
     }
 } catch (error) {
     toast.error(error.response.data.message || "error accoured")
   
 }
}
 return  <>
 <div className='container-fluid login-page '>
   <div className='login'>
     <h3>Forgot Password !</h3>
     <Formik initialValues={{
        password:""
       }}
       validationSchema={UserSchema}
       onSubmit={ handleSubmit}
       >
         {({errors,touched,handleBlur,handleSubmit,handleChange,isSubmitting})=>( 
            <Form onSubmit={handleSubmit}>
  
          <Form.Group className="mb-3" >
          <Form.Label>Enter your Email for reset your password</Form.Label>
          <Form.Control name="email" type="email"    onBlur={handleBlur} onChange={handleChange} placeholder='Enter your Email'/>
          {errors.email && touched.email ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.email}</div> : null}   
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>
     
      <div className="d-grid gap-3">
     <Button variant="dark" size="sm p-2" type='submit' disabled={isSubmitting}>
       Send Link
     </Button>
    </div>
    </Form>)}
     </Formik>
 
   </div>

 </div>
 
 </>
}

export default ForgotPassword