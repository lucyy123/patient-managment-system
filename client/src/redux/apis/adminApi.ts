import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminResMes } from "../../vite-env";
import { AdminReqbodyType } from './../../vite-env.d';

const baseUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/admin`;

export const adminApi = createApi({
    reducerPath:"adminApi",
    baseQuery:fetchBaseQuery({baseUrl,credentials:'include'}),
    endpoints:(builder)=>({
   
         verifyAdmin :builder.mutation<AdminResMes,AdminReqbodyType>({
            query:(body)=>({
                url:`/verify`,
                method:"POST",
                body
            })
         }),

         logoutAdmin:builder.query({
            query:()=>'/logout'
         }),

         getAllAppointments : builder.query({
            query:(id)=>`/get/all/appoint/${id}`
         })


    })

});


export const {useVerifyAdminMutation,useLogoutAdminQuery,useGetAllAppointmentsQuery}= adminApi