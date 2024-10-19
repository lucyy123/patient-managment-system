import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentType, AppointReducerInitStateType, DocAppointment, DocAppointmentInitStateType } from "../../vite-env";


const initialState: AppointReducerInitStateType = {
    appointment: null,
    loading: true
}

export const appointmentReducer = createSlice({
    name: "appointmentReducer",
    initialState,
    reducers: {
        getAppointment: (state, action: PayloadAction<AppointmentType>) => {
            state.appointment = action.payload;
            state.loading = false
        },

    }

});

export const { getAppointment } = appointmentReducer.actions



const initState: DocAppointmentInitStateType = {
    docAppointments: null,
    loading: true
}

export const appointmentListReducer = createSlice({
    name: "appointmentListReducer",
    initialState: initState,
    reducers: {
        getAllAppointments: (state, action: PayloadAction<DocAppointment[]>) => {
            state.docAppointments = action.payload;
            state.loading = false
        }
    }
})

export const { getAllAppointments } = appointmentListReducer.actions