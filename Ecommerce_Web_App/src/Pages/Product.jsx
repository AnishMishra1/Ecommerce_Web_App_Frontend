import React, { useEffect } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../Redux/Slices/CartSlice'
import Card from '../Layouts/Card'
import { useLocation, useNavigate } from 'react-router-dom'

const Product = () => {

    const dispatch = useDispatch()
    const {cart,items} = useSelector((state) => state?.allCart)
    const navigate = useNavigate()
    const {state} = useLocation()

    async function loadAllProduct() {
        await dispatch(getAllProduct());
       
    }

    useEffect(()=>{
      loadAllProduct()
    },[])
  return (
    <>
    <HomeLayouts>
        
    <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white bg-slate-800'>
    
    <div className='flex justify-end mx-2'>
        <button onClick={() => navigate("/cartpage", {state: {...state}})}
        className='py-2 px-3 bg-green-600 hover:bg-green-400 rounded-md text-bold'>Cart({items.length})</button>
    </div>
    
           <h1 className='text-center text-3xl mb-5 font-semibold'>
              Explore the Product please 
              <span className='font-bold text-yellow-500'>
               Welcome To PurunMool
              </span>
            </h1>  
              <div className='mb-10 flex flex-wrap gap-14'>
                {cart?.map((element) => {
                    return <Card 
                    key={element.id}
                    image= {element.images}
                    title = {element.name}
                    price ={element.price}
                    id={element.id}
                    product={element}
                    
                    />
                })}

              </div>
           
        </div>



    </HomeLayouts>
    
    </>
  )
}

export default Product