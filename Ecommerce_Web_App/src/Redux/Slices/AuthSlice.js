import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../Helpers/axiosInstance'
import toast from "react-hot-toast";

const initialState = {
       isLoggedIn : localStorage.getItem('isLoggedIn') || false,
       role: localStorage.getItem('role') || "",
       date:localStorage.getItem('data') || {}

}

export const createAccount = createAsyncThunk('/auth/register',async (data) =>{
       console.log('formdata',data)
    try {
        const res = await axiosInstance.post("/register", data)

    
        toast.promise(res, {
            loading: 'Wait ! Creating Your Account',
            success:(data) => {
                console.log('ghjghjgh',data)
                
                return data?.message
                
            }, 
            error:'Failed to create Account'
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    
})

export default authSlice.reducer;