import React, { useEffect, useState } from 'react'
   import axiosService from '../../common/AxiosService';
import UseLogout from '../../hooks/UseLogout';
import { toast } from 'react-toastify';
import Cards from '../../common/Cards';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

 
function Home() {
const [data,setData]= useState([])
const logout = UseLogout()

const getproducts = async()=>{
  try {
    const res = await axiosService.get('/product')
    
   if(res.status === 200){
    setData(res.data.allProducts)

   }else{
    toast.error(res.data.message)
    
   }
  } catch (error) {
          toast.error(error.response.data.message || "error accoured")
 

  }
}

  useEffect(()=>{
  getproducts()
  },[])
  return <>
<div className='container-fluid '>
  <div >
    <div  className='d-flex img-heading'>
     
     <div className='img-quotes'>
     <h2 className='explore'> Happy<br/> bride at wedding <br/>ceremony and people<br/> sprinkling flower <br/> petalsCLOTHES</h2>
     <p className='quotes'>Live for Influential and Innovative fashion!</p>
     <Button variant="warning" size="sm p-2"   >
        Explore
      </Button>
     </div>
   
     </div>
    
      <div className='cards'>
    {
      data.map((e)=>{
        return  <Cards e = {e} key={e._id}  />
      })
    }
       
     </div>
   </div>
</div>


  </>
}

export default Home