import { Formik } from 'formik';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
 import * as Yup from 'yup';
import axiosService from '../../common/AxiosService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
  const navigate = useNavigate()
  const params = useParams()

  const UserSchema = Yup.object().shape({
    password:Yup.string().required('*Required').min(8,'Password should be atleast 8 characters').max(50,"shuould be below 50 character")
 })
const handleSubmit=async(values)=>{
 try {

  const res= await axiosService.post(`/user/reset-password/${params.token}`,values)
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
     <h3>Reset Password</h3>
     <Formik initialValues={{
        password:""
       }}
       validationSchema={UserSchema}
       onSubmit={ handleSubmit}
       >
         {({errors,touched,handleBlur,handleSubmit,handleChange,isSubmitting})=>( 
            <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3"  >
       <Form.Label>Enter Your New Password</Form.Label>
       <Form.Control type="password" name='password'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter your Password"   />
       {errors.password && touched.password ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.password}</div> : null}
       </Form.Group>
     
      <div className="d-grid gap-3">
     <Button variant="dark" size="sm p-2" type='submit' disabled={isSubmitting}>
       Reset Password
     </Button>
    </div>
    </Form>)}
     </Formik>
 
   </div>

 </div>
 
 </>
}

export default ResetPassword