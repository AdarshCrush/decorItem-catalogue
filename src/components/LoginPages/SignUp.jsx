 import { Formik } from 'formik';
 import React from 'react'
 import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form'; 
  import * as Yup from 'yup';
import axiosService from '../../common/AxiosService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
    
function SignUp() {
  const navigate = useNavigate()
    const UserSchema = Yup.object().shape({
    firstName : Yup.string().required('*Required') ,
    lastName:Yup.string().required("*Required") ,
    email:Yup.string().required("* Required").email("Enter the valid email"),
    password:Yup.string().required('*Required').min(8,'Password should be atleast 8 characters').max(50,"shuould be below 50 character"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  })
 
 const handleSubmit = async(user)=>{
try {
  const res = await axiosService.post('/user/create',{
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    password:user.confirmPassword
  })
  if(res.status === 201){
    toast.success("created sucessfull")
    const res= await axiosService.post('/user/login',{ password:user.confirmPassword,
      email:user.email,})
    if(res.status === 200){
      sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('user',JSON.stringify(res.data.user))
      navigate('/home')
      toast.success(res.data.message)
  
    }else{
      toast.error(res.data.message)
         logout()
    }
  }else{
    toast.error(res.data.message)
  }
} catch (error) {
  toast.error(error.response.data.message || "error accoured")

}
 }
 

  return  <>
  <div className='container-fluid signup-page '>
    <div className='signup'>
      <h3>Sign Up Here !</h3>
          <Formik initialValues={{
          firstName:"",
          lastName:"",
          email:"",
          password:"",
           confirmPassword:""
          }}
          validationSchema={UserSchema}
          onSubmit={ handleSubmit}
          >
          {({errors,touched,handleBlur,handleSubmit,handleChange})=>(
          <Form  onSubmit={handleSubmit}>
          <div className='d-flex gap-2'>
          <Form.Group className="mb-1"  >
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" type="text" onBlur={handleBlur} onChange={handleChange} placeholder="Enter your Last name"  />
          {errors.firstName && touched.firstName ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.firstName}</div>: null} 
          </Form.Group>

          <Form.Group className="mb-1"  >
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name='lastName'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter your Last name"   />
          {errors.lastName && touched.lastName ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.lastName}</div> : null} 

          </Form.Group>
          </div>

          <Form.Group className="mb-1" >
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email"    onBlur={handleBlur} onChange={handleChange} placeholder='Enter your Email'/>
          {errors.email && touched.email ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.email}</div> : null}   
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group className="mb-1"  >
          <Form.Label aria-required>Password</Form.Label>
          <Form.Control type="pass"   name='password'  onBlur={handleBlur} onChange={handleChange} placeholder="Enter your Password"   />
          {errors.password && touched.password ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.password}</div> : null}   

          </Form.Group>
          
          <Form.Group className="mb-3"  >
          <Form.Label aria-required>Confirm Password</Form.Label>
          <Form.Control type="password"  name='confirmPassword'   onBlur={handleBlur} onChange={handleChange} placeholder="Enter your Password"   />
          {errors.confirmPassword && touched.confirmPassword ? <div style={{color:"rgb(13, 91, 216)"}}>{errors.confirmPassword}</div> : null}   

          </Form.Group>

          <div className="d-grid gap-2">
          <Button variant="warning" size="sm p-2"  type='submit' >
          SignUp
          </Button>
          <Button variant="dark" size="sm p-2" onClick={()=>navigate('/login')} >
          Login
          </Button>
       
          </div>
          </Form>
          )}

          </Formik>
  
    </div>
 
  </div>
  </>
}

export default SignUp