import { AdminReqbodyType } from './../../vite-env.d';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminResMes } from "../../vite-env";

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
         })


    })

});


export const {useVerifyAdminMutation,useLogoutAdminQuery}= adminApi