import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import Product from './Pages/Product.jsx'
import CartPage from './Pages/CartPage.jsx'
import ShippingInfo from './Pages/ShippingInfo.jsx'
import Confirm from './Pages/Confirm.jsx'
import Success from './Pages/Success.jsx'
import Fail from './Pages/Fail.jsx'


function App() {
  

  return (
    
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/product' element={<Product />}></Route>
      <Route path='/cartpage' element={<CartPage />}></Route>
      <Route path='/shippinginfo' element={<ShippingInfo />}></Route>
      <Route path='/confirm' element={<Confirm />}></Route>
      <Route path='/success' element={<Success />}></Route>
      <Route path='/Fail' element={<Fail />}></Route>
   
   </Routes>
    
    
    
  )
}

export default App
