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


        }
    }
});


export const {adminExist} = adminReducer.actions