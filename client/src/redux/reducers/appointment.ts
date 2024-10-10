import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentType, AppointReducerInitStateType } from "../../vite-env";


const initialState:AppointReducerInitStateType =  {
    appointment:null,
    loading:true
}

export const appointmentReducer = createSlice({
    name:"appointmentReducer",
    initialState,
    reducers:{
getAppointment:(state,action:PayloadAction<AppointmentType>)=>{

    state.appointment=action.payload;
    state.loading = false
}
    }

});

export const {getAppointment} = appointmentReducer.actions