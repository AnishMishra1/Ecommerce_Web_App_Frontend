import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { Link } from 'react-router-dom'



const Homepage = () => {
  return (
    <HomeLayouts>
    <div className="pt-10 w-full bg-slate-900 text-white flex items-center justify-center gap-10  h-[90vh]">
        <div className="w-1/2 space-y-6">
            <h1 className="text-5xl font-semibold">
               
                <span className="text-cyan-500 font-bold">
                    Welcome To PurunMool Store
                </span>
            </h1>
            <p className="text-xl text-gray-200">
                We have a lot of product related to Health ,Beauty and other etc. We are providing all product one reasonable cost.
            </p>

            <div className="space-x-6">
                <Link to="/courses">
                    <button className="bg-cyan-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-cyan-600 transition-all ease-in-out duration-300">
                        Explore product
                    </button>
                </Link>

                <Link to="/contact">
                    <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                        Contact Us
                    </button>
                </Link>
            </div>
        </div>
{/* 
        <div className="w-1/2 flex items-center justify-center">
            <img alt="homepage image" src={Capture} />
        </div> */}

    </div>
</HomeLayouts>
  )
}

export default Homepage