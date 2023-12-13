import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import Product from './Pages/Product.jsx'
import CartPage from './Pages/CartPage.jsx'


function App() {
  

  return (
    
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/product' element={<Product />}></Route>
      <Route path='/cartpage' element={<CartPage />}></Route>
   
   </Routes>
    
    
    
  )
}

export default App
