import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
 import { FaTelegramPlane } from "react-icons/fa";
 function Footer() {
  return <div className='container-fluid foot'>
    <div className='footer'>
        <div >
            <h3 className='texthead'>Company</h3>
            <div className='text'>
                <h6>About</h6>
                <h6>Careers</h6>
                <h6>Mobile No</h6>
             </div>
        </div>
        <div  >
            <h3 className='texthead'>Location</h3>
            <div className='text'>
                <h6>Chennai</h6>
                <h6>Coimbatore</h6>
                <h6>Nagercoil</h6>
             </div>
        </div>
        <div >
            <h3 className='texthead'>Contact Us</h3>
            <div className='text'>
                <h6>Haelp/FAQ</h6>
                <h6>Collabrator</h6>
                <h6>Afiliated</h6>
             </div>
        </div>
<div className='mt-4'>
            
<div className='icon mb-4' >
    <FaFacebook  size={30}/>
    <FaInstagram size={30}/>
<FaTelegramPlane size={30}/>
 
    </div>
    <div>
        <h6>itemcatalogue@gmail.com</h6>
    </div>
</div>
    </div>
   
  </div>
}

export default Footer