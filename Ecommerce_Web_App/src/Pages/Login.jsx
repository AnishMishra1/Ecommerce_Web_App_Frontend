import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import HomeLayouts from '../Layouts/HomeLayouts';
import { createLogin } from '../Redux/Slices/AuthSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [input , setInput] = useState({
      
      email: '',
      password: ''
  })

  // console.log("ejhjkhjkh",input.fullName,input.email,input.password)

  function handleInputChange(e){
      e.preventDefault();
      const {name, value} = e.target;
      setInput({
          ...input,
          [name]: value
      })

  }

  async function onLogin(event){
      event.preventDefault();
      if( !input.email || !input.password){
          toast.error('All field are mandatory')
          return
      }

      

      
      // const formData = new FormData();
      // console.log("printing",formData)
      // formData.append("fullName", input.fullName);
      // formData.append("email", input.email);
      // formData.append("password", input.password);
     

      const response = await dispatch(createLogin(input))

      if(response?.payload?.success)
      navigate('/')
       
      setInput({
          
          email:'',
          password:''
      })

  }
return (
  <HomeLayouts>
    <div className='flex overflow-x-auto items-center justify-center h-[100vh] bg-slate-900 text-white'>
      <form noValidate
      onSubmit={onLogin}
      className='flex flex-col justify-center items-center shadow-[0_0_10px_black] py-4 px-10'>
          <h1 className='text-3xl text-semibold'>Registration Page</h1>
          <div className='mt-5 flex flex-col justify-center items-center'>
             
          

             


             <label htmlFor="email" className='mt-5'>Email</label>
             <input type="email"
             className='px-2 py-1 text-black border rounded-lg'
             name='email'
             value={setInput.email}
             required
             onChange={handleInputChange}
             placeholder='Enter your email'
             id='email'
          

             />


             <label htmlFor="password" className='mt-5'>password</label>
             <input type="password"
             className='px-2 py-1 text-black border rounded-lg'
             name='password'
             value={setInput.password}
             required
             onChange={handleInputChange}
             placeholder='Enter your password'
             id='password'
          

             />
          </div>

          <button type='submit'
          className='mt-5 py-2 px-4 bg-green-700 hover:bg-green-400 border rounded-lg'
          >Login</button>

              <p className="text-center">
                      Do not have an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                  </p> 
      </form>
    </div>
  </HomeLayouts>
)
}

export default Login