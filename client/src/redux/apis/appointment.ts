import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppointReqBodyType, AppointResBodyType } from "../../vite-env";

const baseUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/appointment`;


export const appointApi = createApi({
    reducerPath:"appointApi",
    baseQuery:fetchBaseQuery({baseUrl, credentials: 'include' }),
    endpoints:(builder)=>({
        newAppointment:builder.mutation<AppointResBodyType,AppointReqBodyType>({
            query:(body)=>({
              url:'/new',
              method:"POST",
              body  
            })
        })
    })
})

export const {useNewAppointmentMutation} = appointApi