import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosService from './AxiosService';
import { toast } from 'react-toastify';
import UseLogout from '../hooks/UseLogout';


function CardViewById() {
    const navigate = useNavigate()
    const params = useParams()
    const [products,setProducts]=useState([])
  const logout = UseLogout()
  const userData = JSON.parse(sessionStorage.getItem('user'))

     const viewById = async()=>{
        try {
            const res = await AxiosService.get(`/product/${params.id}`)
            if(res.status === 200){
                console.log(res.data.user);
                
                setProducts(res.data.user)
            }else{
                toast.error(res.data.message)
              navigate('/home')
            }
        } catch (error) {
                  toast.error(error.response.data.message || "error accoured")
            logout()
        }
     }

const handleDelete=async(id)=>{
 try {
    const res = await AxiosService.delete(`/product/delete/${id}`)
    if(res.status === 200){
        toast.success(res.data.message)
        navigate('/home')
    }else{
        toast.error(res.data.message)
    }
 } catch (error) {
    toast.error(error.response.data.message || "error accoured")

 }
}

const openWhatsapp = ()=>{
  const number = "9489191947"
  const message = "I want more information about this "
  const url = `http://wa.me/${number}?text=${decodeURIComponent(message)}`
  window.open(url,"_blank")
}

useEffect(()=>{
    viewById()
},[])

  return <>
  <div className='container-fluid img-view'>
  <div className=' d-flex gap-4 ms-5 ' >
    <div  >
      <Card.Img variant="top" className='img-scale' src={products.imageUrl}/>
      </div>
      <div >
      <Card className='textbody' >
        <Card.Body className='card-body'> 
        <Card.Title style={{fontSize:'30px'}}>{products.title}</Card.Title>
    
          <Card.Title style={{fontSize:'22px'}}>{products.description}</Card.Title>
          <Card.Text className='text-color mb-0 p-0' style={{fontSize:'15px'}}>
        Special Price
      </Card.Text>
          <div className='d-flex gap-4 mt-0 p-0'>
      <Card.Text className='f-weight'>
      &#8377;{products.discountPrice} <span className=' text-muted text-decor' style={{fontSize:'20px'}} >{products.MrpPrice}</span>
      </Card.Text> 
     
       <Card.Text className='text-color pt-2' style={{fontSize:'20px'}}>
        {products.offer}% Off
      </Card.Text>
     </div>
     <Card.Text  style={{fontSize:'20px'}}>
        Category : {products.category} Decoration
      </Card.Text>
       <div className='d-flex gap-3'>
     
          <Card.Text className='text-muted' style={{fontSize:'15px'}}>
            Size :<span> {products.size}</span>
          </Card.Text>
      </div>
            {
       userData.role==='admin'?<div className='admin-btn'>
        <Button variant="warning" type="submit" onClick={()=>navigate(`/edit/${products._id}`)} > Edit</Button> 
        <Button variant="danger" type="submit" onClick={()=>handleDelete(products._id)}   > Delete </Button>
       </div>: <></>

      }
           </Card.Body>
           <Button variant='success' onClick={openWhatsapp} >For Enquiry :+91 7745678983</Button>

      </Card>
      </div>
 
   </div>
   </div></>
}

export default CardViewById