import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = ({
    isPaymentVerify: false,
    key:" ",
    orderId:" "
})


export const getRazorpaykey = createAsyncThunk('/payment/key',async () => {
    try {
        const response =  axiosInstance.get("/user/getkey");
        console.log(response)
        return (await response).data
    } catch (error) {
        toast.error('failed to load data')
    }

})

export const checkout = createAsyncThunk('/payment/checkout',async (data) => {
     console.log("important",data)
    try {
        
        const response =  axiosInstance.post('/user/checkout',{
            amount :data
        }
           
        );
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.message)
    }

})

export const paymentVerify = createAsyncThunk('/payment/verification',async (data) => {
      console.log(data)
    try {
        const response =  axiosInstance.post("/user/verificationpayment",{
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_order_id: data.razorpay_order_id,
            razorpay_signature : data.razorpay_signature
        
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.message)
    }

})
const RazorpaySlice = createSlice({
    name:"payment",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getRazorpaykey.fulfilled,(state,action) => {
            state.key=action?.payload?.key
            console.log("gerfy" ,state.key)
        })
        .addCase(checkout.fulfilled, (state,action) => {
            console.log("checking",action.payload)
            state.orderId= action?.payload?.order?.id
            console.log("final", state.orderId)
        }).
        addCase(paymentVerify.fulfilled, (state,action) => {
            toast.success(action?.payload?.message),
            state.isPaymentVerify= action?.payload?.success

        })
        .addCase(paymentVerify.rejected,(state,action) => {
            toast.success(action?.payload?.message)
            state.isPaymentVerify= action?.payload?.success
        })

    }
})

export default RazorpaySlice.reducer;