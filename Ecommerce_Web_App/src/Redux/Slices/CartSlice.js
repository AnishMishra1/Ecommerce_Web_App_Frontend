import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = ({
    cart: [],
    items:localStorage.getItem('products') || [],
    totalQuantity:0,
    totalPrice:0,
    
})

export const getAllProduct = createAsyncThunk('/cart/product', async () => {
    try {
        const response = axiosInstance.get('/products');
        toast.promise(response, {
            loading: 'loading product',
            success: "product loaded succefully",
            error: "Failed to get product"
        })
        return (await response).data.products
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.fulfilled, (state,action) => {
            if(action.payload){
                console.log(action.payload)
                state.cart= [...action.payload]
            }
        })
    }
     
       
    
})


export default cartSlice.reducer;