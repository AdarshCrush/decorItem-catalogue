import React, { useEffect, useState } from 'react'
import axiosService from '../../common/AxiosService'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
 function AllBlogs() {
    const navigate = useNavigate()
    const [blog,setBlog]=useState([])
    const getblogs = async()=>{
        try {
          const res = await axiosService.get('/product')
          
         if(res.status === 200){
          setBlog(res.data.allProducts)
       
      
         }else{
          toast.error(res.data.message)
          }
        } catch (error) {
                toast.error(error.response.data.message || "error accoured")
       
        }
      }

      useEffect(()=>{
        getblogs()
      },[])
    return<>
    <div className='container-fluid'>
   <div className='cards'>
{
    blog.map((e,i)=>{
        return<>
         <Card className='boxhover'  style={{ width: '13rem'  }}  onClick={()=>navigate(`/productViewBy/${e._id}`)} >
    <Card.Img className='pic-size' variant="top"  src={e.imageUrl}/>
    <Card.Body className='text-body ps-3'>
      <Card.Title>{e.title}</Card.Title>
      <Card.Text style={{fontSize:'12px'}}>{e.description}</Card.Text>
      <div className='d-flex gap-4 '>
        <Card.Text>&#8377;{e.discountPrice} 
         &nbsp; &nbsp; <span className='text-decor'>{e.MrpPrice}</span>
        </Card.Text> 
        <Card.Text className='text-color'>{e.offer}% Off</Card.Text>
      </div>
      <div className='d-flex gap-3'>
        <Card.Text className='text-muted'> Size</Card.Text>  
        <Card.Text>{e.size}</Card.Text>
      </div>
     </Card.Body>
  </Card></>
    })
}
   </div>
     </div></>
}

export default AllBlogs