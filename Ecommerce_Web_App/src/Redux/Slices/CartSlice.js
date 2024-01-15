import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


const initialState = ({
    cart: [],
    orderItems: [],
    totalQuantity:0,
    itemPrice:0,
    taxPrice:0,
    totalPrice:0,
    shippingPrice:0,
    shippingInfo:localStorage.getItem("shippingInfo") != undefined ? JSON.parse(localStorage.getItem("shippingInfo")):{}

    
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

// export const saveShippingInfo = createAsyncThunk('/cart/shippingInfo', async (allInput) => {
//     try {
//         const response = allInput
//          toast.promise(response,{
//             loading: 'data is laoding',
//             success: "data loaded succefully",
//                 error: "Failed "
//          })
//          return data
//     } catch (error) {
//         toast.error(error)
        
//     }
// })

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state,action) =>{
            let find = state.orderItems.findIndex((element) => element._id === action.payload._id)
            if(find >= 0){
                state.orderItems[find].stock += 1;
            }
            else{
                state.orderItems.push(action.payload)
            }
        } ,
        getCartTotal: (state)=> {
            let {totalPrice, totalQuantity} = state.orderItems.reduce(
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
            state.orderItems = state.orderItems.filter((item) => item._id !== action.payload)
        },
        increaseItem: (state,action) => {
            state.orderItems = state.orderItems.map((item) => {
                if(item._id ===action.payload){
                    return {...item, stock: item.stock +1}
                }
                
                    return item
                
            })
        },
        decreaseItem : (state,action) => {
            state.orderItems = state.orderItems.map((item) => {
                if(item._id ===action.payload){
                    return {...item, stock: item.stock -1}
                }
                
             return item;
        } ) 
        
        } ,
        saveShippingInfo: (state,action) => {
            console.log(action.payload)
            localStorage.setItem("shippingInfo", JSON.stringify(action?.payload));
            state.shippingInfo= action?.payload
            
        }
        
         
            
             
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.fulfilled, (state,action) => {
            if(action.payload){
                console.log(action.payload)
                
                state.cart= [...action.payload];
                
            }
        })
        
        
    }
     
       
    
})

export const {addToCart,getCartTotal,removeItem,increaseItem,decreaseItem,saveShippingInfo } = cartSlice.actions
export default cartSlice.reducer;