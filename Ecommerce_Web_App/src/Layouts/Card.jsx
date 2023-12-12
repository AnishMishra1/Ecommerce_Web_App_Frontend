import React from 'react'


const Card = ({img,title, price,id}) => {
  return (
    <div>
        <div key={id}
        className='w-60 h-55 items-center justify-center flex flex-col mt-5 px-5 py-5 shadow-[0_0_10px_black] bg-slate-100 rounded-lg'>
        <div className='font-bold text-black text-1xl '>{title}</div>
        <div>
            <img src={img} alt={img} className='w-34 h-24 px-2 py-1 ' />
        </div>
        <div className='font-bold text-black text-1xl ' >{price}</div>
        <button 
        
        className='font-bold text-1xl py-1 px-3 rounded-lg bg-green-800 hover:bg-green-400'>ADD TO CARD</button>
    </div>
    </div>
  )
}

export default Card