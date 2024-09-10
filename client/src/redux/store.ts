import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./apis/userApi";
import { userReducer } from "./reducers/user";

export const store = configureStore({
    reducer:{
        [userAPI.reducerPath]:userAPI.reducer,
        [userReducer.name] : userReducer.reducer
    },

    middleware:(gdm)=>gdm().concat(userAPI.middleware)
})