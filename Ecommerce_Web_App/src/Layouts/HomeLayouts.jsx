import React from 'react'
import {FiMenu} from 'react-icons/fi'
import { AiFillCloseCircle} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useDispatch , useSelector} from 'react-redux'
import { createLogout } from '../Redux/Slices/AuthSlice';


const HomeLayouts = ({ children }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const isLoggedIn = useSelector( (state) =>  state?.auth?.isLoggedIn)
   console.log(isLoggedIn)
   const role = useSelector((state) => state?.auth?.role)

   async function handleLogout(e){
    e.preventDefault()

    const res = await dispatch(createLogout())
    if(res?.payload?.success)
    navigate('/')
   }

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle")
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }
  return (
    <div className='min-h-[90vh] '>
        <div className='drawer absolute z-50 w-fit '>
               <input id="my-drawer" type="checkbox" className="drawer-toggle" />
               <div className="drawer-content">
                 <label htmlFor="my-drawer" className='cursor-pointer relative'>
                    <FiMenu 
                      onClick={changeWidth}
                      size={'32px'}
                      className='font-bold text-white m-4'
                    />
                 </label>
               </div>
               <div className="drawer-side w-0">
               <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                   <ul className="menu p-4 h-[100%] w-48 sm:w-80 bg-base-100 text-base-content relative">
                    <li className='w-fit absolute right-2 z-50'>
                        <button>
                          <AiFillCloseCircle
                          size={24}
                          onClick={hideDrawer}
                          />
                        </button>
                    </li>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/product'>All Product</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact Us</Link>
                    </li>
                    {isLoggedIn && role === "ADMIN" && (
                      <li>
                        <Link to='/admin-dashboard'>Admin Dashboard</Link>
                      </li>
                    )}
                   </ul>
                   {!isLoggedIn && (
                    <div className="absolute bottom-4 md:mx-5 flex flex-row justify-center items-center gap-5 text-white">
                      <button className='btn-secondary py-1 px-4 rounded-full bg-green-900 text-bold w-full  hover:bg-green-400'>
                        <Link to='/login'>Login</Link>
                      </button>
                      <button className='btn-secondary py-1 px-4 rounded-full bg-green-900 text-bold w-full  hover:bg-green-400'>
                        <Link to='/signup'>SignUp</Link>
                      </button>
                    </div>
                   )}

                    {isLoggedIn && (
                    <div className="absolute bottom-0 mx-10 flex flex-row justify-center items-center gap-5 text-white">
                      <button className='btn-primary py-2 px-5 rounded-full bg-green-900 text-bold w-full hover:bg-green-400'>
                        <Link to='/profile'>Profile</Link>
                      </button>
                      <button className='btn-secondary py-1 px-4 rounded-full bg-green-900 text-bold w-full  hover:bg-green-400'>
                        <Link onClick={handleLogout}>Logout</Link>
                      </button>
                    </div>
                   )} 
               </div>

        </div>

        {children}
        <div className='h-auto'>
        <Footer />
        </div>

        
    </div>
  )
}

export default HomeLayouts