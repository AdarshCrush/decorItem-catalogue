import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/LoginPages/Login"
import SignUp from "./components/LoginPages/SignUp"
import ResetPassword from "./components/LoginPages/ResetPassword"
import ForgotPassword from "./components/LoginPages/ForgotPassword"
import Home from "./components/DashboardPages/Home"
import NavBar from "./components/DashboardPages/NavBar"
import ProtectedRoutes from "./common/ProtectedRoutes"
import CardViewById from "./common/CardViewById"
import CreateProduct from "./components/DashboardPages/CreateProduct"
import EditBlog from "./components/DashboardPages/EditBlog"
import Footer from "./components/DashboardPages/Footer"
import Dashboard from "./components/DashboardPages/Dashboard"
import AllBlogs from "./components/DashboardPages/AllBlogs"
import FilterBlog from "./components/DashboardPages/FilterBlog"
 function App() {
 
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route  path="/login" element={<Login/>}  />
        <Route path="/*" element={<SignUp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/home" element={<><NavBar/><ProtectedRoutes><Home/></ProtectedRoutes></>}/>
        <Route path="/create" element={<><NavBar/><ProtectedRoutes><CreateProduct/></ProtectedRoutes></>}/>
        <Route path="dashboard" element={<><NavBar/><ProtectedRoutes><Dashboard/></ProtectedRoutes></>}     />
        <Route  path="/edit/:id" element={<><NavBar/><ProtectedRoutes><EditBlog/></ProtectedRoutes></>}  />
         <Route   path="/productViewBy/:id"  element={<><NavBar/><ProtectedRoutes><CardViewById/></ProtectedRoutes></>} />
         <Route   path="/allblogs"  element={<><NavBar/><ProtectedRoutes><AllBlogs/></ProtectedRoutes></>} />
         <Route  path="/filterblogs/:name"  element={<><NavBar/><ProtectedRoutes> <FilterBlog/></ProtectedRoutes></>} />

        </Routes>
        <Footer/>
      </BrowserRouter> 
    </>
  )
}

export default App
