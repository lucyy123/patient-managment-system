import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AdminInitStateType, AdminType } from "../../vite-env";


const initialState: AdminInitStateType = {
    admin: null,
    loading: true
}

export const adminReducer = createSlice({
    name: "adminReducer",
    initialState,
    reducers: {
        adminExist: (state, action: PayloadAction<AdminType>) => {
            state.admin = action.payload
            state.loading = false
        },
        adminNotExist:(state)=>{
            state.admin=null
            state.loading=true
        }
    }
});


export const { adminExist,adminNotExist } = adminReducer.actions