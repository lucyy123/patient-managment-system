import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState, UserTYPE } from "../../vite-env";

const initialState: UserReducerInitialState = {
    user: null,
    loading: true
}


export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action: PayloadAction<UserTYPE>) => {

            state.user = action.payload;
            state.loading = false

        },
        userNotExist: (state) => {

            state.user = null;
            state.loading = true

        }
    }
});

export const {userExist,userNotExist} = userReducer.actions

