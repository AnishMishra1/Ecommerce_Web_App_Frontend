import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'


function App() {
  

  return (
    
    <Routes>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
   
   </Routes>
    
    
    
  )
}

export default App
