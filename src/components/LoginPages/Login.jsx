import React from 'react'
import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form';  
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axiosService from '../../common/AxiosService';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import UseLogout from '../../hooks/UseLogout';
  

  
function Login() {
  const logout = UseLogout()
  const navigate = useNavigate()
  const UserSchema = Yup.object().shape({
     email:Yup.string().required("* Required").email("Enter the valid email"),
    password:Yup.string().required('*Required').min(8,'Password should be atleast 8 characters').max(50,"shuould be below 50 character")
  })
const handleSubmit=async(values)=>{
  try {
   const res= await axiosService.post('/user/login',values)
      if(res.status === 200){
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('user',JSON.stringify(res.data.user))
  navigate('/home')
        toast.success(res.data.message)
    
      }else{
        toast.error(res.data.message)
           logout()
      }
  } catch (error) {
      toast.error(error.response.data.message || "error accoured")
    
  }
}
  return  <>
  <div className='container-fluid login-page '>
    <div className='login'>
      <h3>LOGIN HERE !</h3>
      <Formik initialValues={{
        email:"",
        password:""
        }}
        validationSchema={UserSchema}
        onSubmit={ handleSubmit}
        >
          {({errors,touched,handleBlur,handleSubmit,handleChange,isSubmitting})=>( 
             <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"  name='email'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter your email"  />
        {errors.email && touched.email ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.email}</div> : null}
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3"  >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter your Password"   />
        {errors.password && touched.password ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.password}</div> : null}
      <Link to={'/forgot-password'} > <p className='password'>ForgotPassword</p>
      </Link>
       </Form.Group>
      
       <div className="d-grid gap-3">
      <Button variant="dark" size="sm p-2" type='submit' disabled={isSubmitting}>
        Login
      </Button>
      <Button variant="warning" size="sm p-2" onClick={()=>navigate('/*')} >
        SignUp
      </Button>
    </div>
     </Form>)}
      </Formik>
  
    </div>
 
  </div>
  
  </>
}

export default Login