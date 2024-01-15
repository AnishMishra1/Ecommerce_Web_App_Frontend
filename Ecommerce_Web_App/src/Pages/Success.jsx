import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../Redux/Slices/RazorpaySlice';
import { useLocation } from 'react-router-dom';

const Success = () => {

  const dispatch = useDispatch()
  const {} = useLocation();

  const {}  = useSelector((state) => state?.auth?.data)
  const {orderItems,shippingInfo,totalPrice, ShippingPrice,taxPrice,itemPrice}  = useSelector((state) => state?.allCart)
  console.log(shippingInfo)
  const {razorpay_payment_id,isPaymentVerify}  = useSelector((state) => state?.payment)

 
  

  const [intialData, setData] = useState(
    {
      itemPrice:itemPrice,
    taxPrice:taxPrice,
    ShippingPrice:ShippingPrice,
    totalPrice:totalPrice,
    orderItems: orderItems.map((e) => ({product:e._id, name:e.name,price:e.price, quantity:e.stock})) ,
    shippingInfo: shippingInfo ,
    paymentInfo:{
      id: razorpay_payment_id,
      status: isPaymentVerify
    },
    } 
  )

  async function load(){
    const res3 =await dispatch(createOrder(intialData))
    console.log(res3)
  } 

  useEffect(()=>{
    load();
  },[])
  return (
    <div>order palce succefully</div>
  )
}

export default Success