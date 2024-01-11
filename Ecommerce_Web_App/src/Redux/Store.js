import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import CartSliceReducer from "./Slices/CartSlice";
import RazorpaySlice from "./Slices/RazorpaySlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        allCart: CartSliceReducer,
        payment: RazorpaySlice
        
    },
    devTools:true
});

export default store;