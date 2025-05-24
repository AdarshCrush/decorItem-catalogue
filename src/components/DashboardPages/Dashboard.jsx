import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import axiosService from '../../common/AxiosService';
import { toast } from 'react-toastify';
import UseLogout from '../../hooks/UseLogout';
import { useNavigate } from 'react-router-dom';
 function Dashboard() {
    const [click,setClick]=useState("product")
    const [theme,setTheme]=useState("btn")
    const [theme2,setTheme2]=useState("btn")

  return <>
  <div className='container-fluid'>
        <Nav variant="tabs" >
      <Nav.Item className={theme}  >
        <Nav.Link  id='userbtn' onClick={()=>{setClick("product"),setTheme("btn")}}>Blog List</Nav.Link>
      </Nav.Item>
      <Nav.Item className={theme2}  >
        <Nav.Link   id='userbtn' onClick={()=>{setClick("users"),setTheme2("btn")}}>Users List</Nav.Link>
      </Nav.Item>
     </Nav>
     {
      click==='users'?<UserLink/>:<BlogListLinks/>
     }
  </div>
  </>
}


function BlogListLinks(){
    const navigate = useNavigate()
    const logout = UseLogout()
const [blog,setBlog]=useState([])
const getAllBlogs = async()=>{
    try {
        const res = await axiosService.get('/product')
        if(res.status === 200){
            toast.success('All Blogs fetched Successfull')
            setBlog(res.data.allProducts)
        }
    } catch (error) {

      toast.error(error.response.data.message || "error accoured")
        logout()
    }
}

useEffect(()=>{
    getAllBlogs()
},[])

    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>SL No</th>
                <th>Image</th>
                <th>Title</th>
                 <th>Category</th>
                <th>Actual Price</th>
                <th>DiscountPrice</th>
                <th>Created By</th>
                <th>Modified By</th>
                <th>Created At</th>

            </tr>
        </thead>
        <tbody>
           {
            blog.map((e,i)=>{
                return <tr key={e._id}  onClick={()=>navigate(`/productViewBy/${e._id}`)}>
                    <td>{i+1}</td>
                    <td><img src={e.imageUrl} alt="" className='imgUrl'/> </td>
                    <td>{e.title} </td>
                     <td>{e.category} </td>
                    <td>{e.MrpPrice} </td>
                    <td>{e.discountPrice} </td>
                    <td>{e.createdBy} </td>
                    <td>{e.modifiedBy} </td>
                    <td>{e.createdAt} </td>
                </tr>
            })
           }
        </tbody>
    </Table>
}



function UserLink(){
    const logout = UseLogout()
    const [user,setUser] = useState([])
    const getAllUsers = async()=>{
        try {
            const res = await axiosService.get('/user')
            if(res.status === 200){
                toast.success(res.data.message)
                setUser(res.data.users)
            }else{
                logout()
            }
        } catch (error) {
            toast.error(error.response.data.message || "error accoured")
           logout()
        }
    }


    useEffect(()=>{
        getAllUsers()
    },[])
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>SL.No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>CreatedAt</th>
            </tr>
        </thead>
        <tbody>
            {
                user.map((e,i)=>{
                    return <tr key={e._id}>
                        <td>{i+1}</td>
                        <td>{e.firstName} </td>
                        <td>{e.lastName} </td>
                        <td>{e.email} </td>
                        <td>{e.role}</td>
                        <td>{e.createdAt} </td>

                    </tr>
                })
            }
        </tbody>
    </Table>
}
export default Dashboard