import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = ({
    cart: [],
    items: [],
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
    reducers:{
        addToCart: (state,action) =>{
            let find = state.items.findIndex((element) => element._id === action.payload._id)
            if(find >= 0){
                state.items[find].stock += 1;
            }
            else{
                state.items.push(action.payload)
            }
        } ,
        getCartTotal: (state)=> {
            let {totalPrice, totalQuantity} = state.items.reduce(
                (cartTotal, cartItem) =>{
                    console.log("cartTotal", cartTotal);
                    console.log("cartItem", cartItem);
                    const {price,stock} = cartItem
                    console.log(price,stock);
                    const itemTotal = price*stock;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.totalQuantity +=stock;
                    return cartTotal
                },
                {
                    totalPrice:0,
                    totalQuantity:0,

                }
            );
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQuantity = totalQuantity;
        }, 
        removeItem: (state,action) => {
            state.items = state.items.filter((item) => item._id !== action.payload)
        },
        increaseItem: (state,action) => {
            state.items = state.items.map((item) => {
                if(item._id ===action.payload){
                    return {...item, stock: item.stock +1}
                }
                
                    return item
                
            })
        },
        decreaseItem : (state,action) => {
            state.items = state.items.map((item) => {
                if(item._id ===action.payload){
                    return {...item, stock: item.stock -1}
                }
                
             return item;
        } ) 
        
    }   
            
             
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.fulfilled, (state,action) => {
            if(action.payload){
                console.log(action.payload)
                
                state.cart= [...action.payload]
            }
        })
        
    }
     
       
    
})

export const {addToCart,getCartTotal,removeItem,increaseItem,decreaseItem } = cartSlice.actions
export default cartSlice.reducer;