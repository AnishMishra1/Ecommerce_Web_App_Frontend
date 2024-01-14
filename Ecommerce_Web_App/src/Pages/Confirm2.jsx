import React, { useEffect } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { useLocation, useNavigate,  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkout, getRazorpaykey, paymentVerify} from '../Redux/Slices/RazorpaySlice';
import toast from "react-hot-toast";

const Confirm2 = () => {

    const dispatch = useDispatch();
  const navigate = useNavigate();
  const {} = useLocation()

  const razorpayKey = useSelector((state) => state?.payment?.key);
  
  const orderId = useSelector((state) => state?.payment?.order?.id)
  const userData = useSelector((state) => state?.auth?.data)
  const {totalPrice} = useSelector((state) => state?.allCart)
  
  
  const isPaymentVerify = useSelector((state)=> state?.payment?.isPaymentVerify)

  const paymentDetails = {
      razorpay_payment_id : '',
      razorpay_order_id: '',
      razorpay_signature:'',
     
  }

  

  async function handleOrder() {
      // e.preventDefault();
      if(!razorpayKey || !orderId){
          toast.error('something went wrong')
      }

      const options = {
          key: razorpayKey,
          order_id: orderId,
          amount:totalPrice,
          name: userData.fullName,
          description: 'order',
          theme: {
             color: '#F37254'
          },
          prefill:{
              email: userData.email,
              name: userData.fullName
          },

          handler: async function (response){
              paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
              paymentDetails.razorpay_signature = response.razorpay_signature;
              paymentDetails.razorpay_order_id = response.razorpay_order_id;

              toast.success('payment successfull')

              const res = await  dispatch(paymentVerify(paymentDetails))
              console.log(res)

              res?.payload?.success ? navigate('/success'): navigate('/fail')
              
             
       }
         

      }

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
  }

  async function load(){
    const res2 = await dispatch(getRazorpaykey())
    console.log(res2);
    const res1= await dispatch(checkout(totalPrice))
    console.log(res1,"hghjgjhghjgjh");
  }

  useEffect(() =>{
     load();
  },[])


    
  return (
   <>
   <HomeLayouts>
   <div className='flex overflow-x-auto items-center justify-center h-[100vh] bg-slate-900 text-white'>
    <button onClick={handleOrder} className='bg-green-800 py-1 px-2'>Proceed</button>
    </div>   
   </HomeLayouts>
   </>
  )
}




export default Confirm2