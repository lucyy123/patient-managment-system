import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { config } from "dotenv";
import { UserRegisterReqBody, UserRegistrationResMsg, UserVefiyReqBody } from "../../vite-env";
// config();

const baseUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/user`;


export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    userRegister: builder.mutation<UserRegistrationResMsg, UserRegisterReqBody>({
      query: (body) => ({
        url: "/register/new",
        method: "POST",
        body,
      }),
    }),

    verifyUser: builder.mutation<UserRegistrationResMsg,UserVefiyReqBody>({
      query: (body) => ({
        url: '/verify/new',
        method: 'POST',
        body
      })
    })




  }),
});


export const { useUserRegisterMutation,useVerifyUserMutation } = userAPI