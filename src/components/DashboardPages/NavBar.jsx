import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 import { useNavigate } from 'react-router-dom';
import UseLogout from '../../hooks/UseLogout';
import { BsArrowThroughHeartFill } from "react-icons/bs";
function NavBar() {
  const [role,setRole]= useState("")
  const logout = UseLogout()

  const userdata=JSON.parse(sessionStorage.getItem('user'))
   
  useEffect(()=>{
setRole(userdata.role)
 },[])
 

 
  return  <>
  <div className='container-fluid '>
  <Navbar expand="lg"  >
      <Container fluid>
        <Navbar.Brand className='brand' >L<BsArrowThroughHeartFill size={40} />VELY DECORS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav  className="me-auto my-2 ms-5 my-lg-0"  style={{ maxHeight: '100px' }} navbarScroll   >

      { 
        role === "admin"?<AdminLink/>:<UserLink/>
      }
           
          </Nav>
          <Form className=" search">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Text className='me-3 username' >{userdata.firstName}</Navbar.Text>
          <Button variant="danger" onClick={logout}>Logout</Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  </>
}



function AdminLink(){
  const navigate = useNavigate()

  return<>
       <Nav.Link    onClick={()=>navigate('/home')} className='headerLink' >Home</Nav.Link>
            <Nav.Link   onClick={()=>navigate('/allblogs')} className='headerLink' >All blogs</Nav.Link>
            <Nav.Link   onClick={()=>navigate('/create')} className='headerLink' >Create</Nav.Link>
            <Nav.Link  onClick={()=>navigate('/dashboard')} className='headerLink' >Dashboard</Nav.Link>
  </>
}


function UserLink(){
  const navigate = useNavigate()
  return<>
       <Nav.Link  className='headerLink'onClick={()=>navigate('/home')} >Home</Nav.Link>
            <Nav.Link onClick={()=>navigate('/filterblogs/wedding')} className='headerLink' >Wedding </Nav.Link>
            <Nav.Link onClick={()=>navigate('/filterblogs/housewarming')} className='headerLink' >House Farming</Nav.Link>
            <Nav.Link onClick={()=>navigate('/filterblogs/birthday')} className='headerLink' >Birthday</Nav.Link>
  </>
}
export default NavBar
