import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [input , setInput] = useState({
        fullName:'',
        email: "",
        password: ''
    })

    function handleInputChange(e){
        e.preventDefault();
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]: value
        })

    }

    async function createAccount(event){
        event.preventDefault();
        if(!input.fullName || !input.email || !input.password){
            toast.error('All field are mandatory')
            return
        }

        if(input.fullName.length<5){
            toast.error("Minimum 5 charater required atleast")
            return
        }

        if(input.password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")){
            toast.error('special charater is required')
            return
        }
        if(input.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
            toast.error('please enter valid email id')
            return
        }

        const response = await dispatch(createAccount(input))

        if(response?.payload?.success)
        navigate('/')
         
        setInput({
            fullname:'',
            email:'',
            password:''
        })

    }
  return (
    <HomeLayouts>
      <div className='flex overflow-x-auto items-center justify-center h-[100vh] bg-slate-900 text-white'>
        <form noValidate
        onSubmit={createAccount}
        className='flex flex-col justify-center items-center shadow-[0_0_10px_black] py-4 px-10'>
            <h1 className='text-3xl text-semibold'>Registration Page</h1>
            <div className='mt-5 flex flex-col justify-center items-center'>
               <label htmlFor="fullName" className='mt-5'>Full Name</label>
               <input type="text"
               className='px-2 py-1  border rounded-lg text-black'
               name='fullName'
               value={setInput.fullName}
               required
               onChange={handleInputChange}
               placeholder='Enter your Full Name'
               id='fullName'
            

               />


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
               id='fullName'
            

               />
            </div>

            <button type='submit'
            className='mt-5 py-2 px-4 bg-green-700 hover:bg-green-400 border rounded-lg'
            >Create Account</button>

                <p className="text-center">
                        Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
                    </p> 
        </form>
      </div>
    </HomeLayouts>
  )
}

export default SignUp;