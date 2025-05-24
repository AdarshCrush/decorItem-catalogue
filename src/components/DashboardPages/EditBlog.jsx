import React, { useEffect, useState } from 'react'
import axiosService from '../../common/AxiosService'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
  import UseLogout from '../../hooks/UseLogout';

function EditBlog() {
     const [title,setTitle]=useState("")
     const [imageUrl,setImageUrl]=useState("")
     const [description,setDescription]=useState("")
     const [category,setCategory]=useState("")
     const [MrpPrice,setMrpPrice]=useState("")
     const [discountPrice,setDiscountPrice]=useState("")
     const[size,setSize]=useState("")
    const navigate = useNavigate()
     const logout = UseLogout()
    const params = useParams()
 

 const handleSubmit = async()=>{
    try {
        const res = await axiosService.put(`/product/edit/${params.id}`,{
          title,imageUrl,description,category,
          MrpPrice,discountPrice,size
        })
        if(res.status === 200){
            toast.success("Edited successfully")
             history.back()

            } 
    } catch (error) {
        toast.error(error.response.data.message || "error accoured")
       
    }
 }
const getBlogs=async()=>{
    try {
      const res =   await axiosService.get(`/product/${params.id}`)
      if(res.status === 200){
         setTitle(res.data.user.title)
         setDescription(res.data.user.description)
         setDiscountPrice(res.data.user.discountPrice),
         setImageUrl(res.data.user.imageUrl),
         setSize(res.data.user.size),
         setMrpPrice(res.data.user.MrpPrice),
         setCategory(res.data.user.category)
         
       }
    } catch (error) {
         toast.error(error.response.data.message || "error accoured")
         history.back()
     }
}
 
useEffect(()=>{
if(params.id){
   getBlogs()
}else{
    history.back()
}
},[])
  return  <>
 < div className='container-fluid create-img'>
    <div  className='img-body'>
      <h3>Edit the Blog</h3>
     
       
          <Form   >
          
          <Form.Group className="mb-1"  >
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="input"   value={title}     onChange={(e)=>setTitle(e.target.value)}  />
           </Form.Group>

          <Form.Group className="mb-1"  >
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="text"   value={imageUrl}    onChange={(e)=>setImageUrl(e.target.value)}    />
 
          </Form.Group>
     

          <Form.Group className="mb-1"  >
          <Form.Label>Description</Form.Label>
          <Form.Control type="text"   value={description}      onChange={(e)=>setDescription(e.target.value)}      />
 
          </Form.Group>
            


          <Form.Group className="mb-1"  >
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" value={category} onChange={(e)=>setCategory(e.target.value)}  >
      <option  >Select the Category</option>
      <option value="Wedding">Wedding Decoration</option>
      <option value="Birthday">Birthday Decoration</option>
      <option value="Housewarming">HouseWarming Decoration</option>
    </Form.Select>
         </Form.Group> 
                  
            
            
 
          <div className='d-flex gap-3'>
          <Form.Group className="mb-1"  >
          <Form.Label>Actual  Price</Form.Label>
          <Form.Control type="text"  value={MrpPrice}  onChange={(e)=>setMrpPrice(e.target.value)}      />
 
          </Form.Group>
          <Form.Group className="mb-1"  >
          <Form.Label>DiscountPrice</Form.Label>
          <Form.Control type="text"   value={discountPrice}  onChange={(e)=>setDiscountPrice(e.target.value)}     />
            </Form.Group>
           <Form.Group className="mb-2"  >
          <Form.Label>Size</Form.Label>
          <Form.Control type="text"  value={size}   onChange={(e)=>setSize(e.target.value)}     />
          
           </Form.Group>
         
       
</div>
  

         
           
           <Button variant="warning" size="lg p-2"  onClick={handleSubmit} >
          Update
          </Button>
        
          
          </Form>
      
  
    </div>
 
  </div>
  </>
}

export default EditBlog