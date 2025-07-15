

import './styles/App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Profile from './pages/Profile/Profile.jsx'
import EditProfile from './pages/Profile/EditProfile.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx';
import NotFound from './Components/NotFound.jsx'
import BrandForm from './pages/Brand/BrandForm.jsx'
import EditBrand from './pages/Brand/EditBrand.jsx'
import Brand from './pages/Brand/Brand.jsx'
import BrandView from './pages/Brand/BrandView.jsx'
import VehicleForm from './pages/Vehicle/VehicleForm.jsx'
import Vehicle from './pages/Vehicle/Vehicle.jsx'
import VehicleView from './pages/Vehicle/VehicleView.jsx'
import VehicleEdit from './pages/Vehicle/EditVehicle.jsx'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext.jsx'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import AdminUsers from './Components/Admin.jsx';


function App() {
  const {user} = useContext(AuthContext)
  console.log(user)

  return (
    <>
      {/* <BrowserRouter>
      
      </BrowserRouter> */}

        <div className='app'>

          <Navbar/>
          <main className='main-content'>
          <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route element={<ProtectedRoutes/>}>
                <Route path="/me" element={<Profile/>} />
                <Route path="/edit-profile" element={<EditProfile/>} />
                <Route path="/Brand" element= {<Brand/>}/>
                <Route path="/brand/:id" element={<BrandView/>}/>
                <Route path="/Vehicle" element={<Vehicle/>}/>
                <Route path="/vehicle/:id" element={<VehicleView/>}/>
              <Route element={<ProtectedRoutes allowedRoles={['admin']}/>}>
                <Route path='/admin' element={<AdminUsers/>}/>
                <Route path="/VehicleForm" element={<VehicleForm/>}/>
                <Route path="/Vehicle/edit/:id" element={<VehicleEdit/>}/>
                <Route path='/BrandForm' element={<BrandForm/>}/>
                <Route path='/Brand/edit/:id' element={<EditBrand/>} />
              </Route>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          </div>
          </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
