import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenInitialReducer } from "../../vite-env";


const initialState: TokenInitialReducer = {
    token: null
}


export const tokenReducer = createSlice({
    name: "tokenReducer",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        removeToken: (state) => {
            state.token = null
        }


    }
});

export const {removeToken,setToken} = tokenReducer.actions