import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import CartSliceReducer from "./Slices/CartSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        allCart: CartSliceReducer
        
    },
    devTools:true
});

export default store;