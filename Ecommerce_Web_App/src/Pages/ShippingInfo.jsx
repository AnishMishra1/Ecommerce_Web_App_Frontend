import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveShippingInfo } from '../Redux/Slices/CartSlice';


const ShippingInfo = () => {

    const dispatch = useDispatch()
    const {state} = useLocation()
    const navigate = useNavigate()

    const [input, setInput] =useState({
        fullName:'',
        address:'',
        country:'',
        pinCode:'',
        phoneNo:'',
        city:'',
        state:''

    })

    function handleInputChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        setInput({...input, 
            [name]: value
        })

    }

    

    async function ShippingInfosave(event) {
       event.preventDefault()

      //  if(!input.fullName ||!input.address ||!input.country ||!input.state|| !input.phoneNo|| !input.pincode ||!input.city ){
      //   toast.error('all field are neccesary ')
      //   return
      //  }

       const res = await dispatch(saveShippingInfo(input)) 
       console.log("this is a data", res)

       if(res?.payload)
        navigate('/confirm')

       setInput({
        fullName:'',
        address:'',
        country:'',
        pinCode:'',
        phoneNo:'',
        city:'',
        state:''
       })

       

    }


  return (
    <>
    <HomeLayouts>
    <div className='flex overflow-x-auto items-center justify-center h-[100vh] bg-slate-900 text-white'>
      <form noValidate
      onSubmit={ShippingInfosave}
      
      className='flex flex-col justify-center items-center shadow-[0_0_10px_black] py-4 px-10'>
          <h1 className='text-3xl text-semibold'>Shipping Info</h1>
          <div className='mt-5 flex flex-col justify-center items-center'>
             
          

             


             <label htmlFor="fullName" className='mt-5'>Name</label>
             <input type="text"
             className='px-2 py-1 text-black border rounded-lg'
             name='fullName'
             value={setInput.fullName}
             required
             onChange={handleInputChange}
             placeholder='Enter your name'
             id='fullName'
          

             />


             <label htmlFor="address" className='mt-5'>address</label>
             <input type="address"
             className='px-2 py-1 text-black border rounded-lg'
             name='address'
             value={setInput.address}
             required
             onChange={handleInputChange}
             placeholder='Enter your address'
             id='address'
             />

            <label htmlFor="state" className='mt-5'>State</label>
             <input type="state"
             className='px-2 py-1 text-black border rounded-lg'
             name='state'
             value={setInput.state}
             required
             onChange={handleInputChange}
             placeholder='state'
             id='state'
             />

            <label htmlFor="city" className='mt-5'>City</label>
             <input type="city"
             className='px-2 py-1 text-black border rounded-lg'
             name='city'
             value={setInput.city}
             required
             onChange={handleInputChange}
             placeholder='city'
             id='city'
             />

           <label htmlFor="pinCode" className='mt-5'>Pincode</label>
             <input type="number"
             className='px-2 py-1 text-black border rounded-lg'
             name='pinCode'
             value={setInput.pinCode}
             required
             onChange={handleInputChange}
             placeholder='Enter your pinCode'
             id='pinCode'
             />

            <label htmlFor="phoneNo" className='mt-5'>Phone-Number</label>
             <input type="number"
             className='px-2 py-1 text-black border rounded-lg'
             name='phoneNo'
             value={setInput.phoneNo}
             required
             onChange={handleInputChange}
             placeholder='Enter your phoneNo'
             id='phoneNo'
             />

           <label htmlFor="country" className='mt-5'>Country</label>
             <input type="country"
             className='px-2 py-1 text-black border rounded-lg'
             name='country'
             value={setInput.country}
             required
             onChange={handleInputChange}
             placeholder='Enter your country'
             id='country'
             />
             
          

             
          </div>

          <button type='submit'
          // onClick={() => navigate('/confirm', {state:{...state}}) }
          className='mt-5 py-2 px-4 bg-green-700 hover:bg-green-400 border rounded-lg'
          >Confirm</button>

              
      </form>
    </div>
  </HomeLayouts>
    </>
  )
}

export default ShippingInfo;