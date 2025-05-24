import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
 function Cards({e}) {
  const openWhatsapp = ()=>{
  const number = "9489191947"
  const message = "I want more information about this "
  const url = `http://wa.me/${number}?text=${decodeURIComponent(message)}`
  window.open(url,"_blank")
}
  const navigate = useNavigate()
  return<> <Card className='boxhover'  style={{ width: '13rem'  }}  onClick={()=>navigate(`/productViewBy/${e._id}`)} >
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
        <Card.Text className='text-muted'> Category :</Card.Text>  
        <Card.Text>{e.category} Decoration</Card.Text>
      </div>
     </Card.Body>
      <Button variant='warning' onClick={openWhatsapp} >For Enquiry :+91 7745678983</Button>
  </Card></>
}

export default Cards