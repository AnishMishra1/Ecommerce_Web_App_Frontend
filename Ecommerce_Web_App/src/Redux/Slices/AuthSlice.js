import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../Helpers/axiosInstance'
import toast from "react-hot-toast";

const initialState = {
       isLoggedIn : localStorage.getItem('isLoggedIn') || false,
       role: localStorage.getItem('role') || "",
       data:localStorage.getItem('data') || {}

}

export const createAccount = createAsyncThunk('/auth/register',async (data) =>{
       console.log('formdata',data)
    try {
        const res = axiosInstance.post("/register", data)

    
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

export const createLogin = createAsyncThunk('/auth/login', async(data) =>{
    try {
        const response = axiosInstance.post('/login', data)
        toast.promise(response, {
            loading:'Wait! for Loging',
            success: (data) =>{
                return data?.data?.message
            },
            error:"login failed"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
})

export const createLogout = createAsyncThunk('/auth/logout', async(data) =>{
    try {
        const response = axiosInstance.get('/logout', data)
        toast.promise(response, {
            loading:'Wait! for Logout',
            success: (data) =>{
                return data?.data?.message
            },
            error:"logout failed"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.
        addCase(createLogin.fulfilled,(state,action) => {
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem('role', action?.payload?.user?.role);
          state.data= action?.payload?.user;
          state.isLoggedIn = true;
          state.role = action?.payload?.user?.role
        })
        .addCase(createLogout.fulfilled, (state) =>{
            localStorage.clear();
            state.data = {},
            state.isLoggedIn = false
            state.role = ''
        })
    }
    
})

export default authSlice.reducer;