import React, { useEffect } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../Redux/Slices/CartSlice'
import Card from '../Layouts/Card'

const Product = () => {

    const dispatch = useDispatch()
    const {cart} = useSelector((state) => state?.allCart)

    async function loadAllProduct() {
        await dispatch(getAllProduct());
       
    }

    useEffect(()=>{
      loadAllProduct()
    },[])
  return (
    <>
    <HomeLayouts>
    <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white bg-cyan-800'>
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
                    
                    />
                })}

              </div>
           
        </div>



    </HomeLayouts>
    
    </>
  )
}

export default Product