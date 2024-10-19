import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginUserReqBodyType,
  LoginUserResType,
  UserRegisterReqBody,
  UserRegistrationResMsg,
  UserUpdateReqBody,
  UserVefiyReqBody,
} from "../../vite-env";

const baseUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/user`;
console.log('baseUrl:', baseUrl)

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    userRegister: builder.mutation<UserRegistrationResMsg, UserRegisterReqBody>(
      {
        query: (body) => ({
          url: "/register/new",
          method: "POST",
          body,
        }),
      }
    ),

    verifyUser: builder.mutation<UserRegistrationResMsg, UserVefiyReqBody>({
      query: (body) => ({
        url: "/verify/new",
        method: "POST",
        body,
      }),
    }),

    updateUser: builder.mutation<UserRegistrationResMsg, UserUpdateReqBody>({
      query: ({ formdata }) => ({
        method: "PUT",
        body: formdata,
        url: "/update",
      }),
    }),

    loginUser: builder.mutation<LoginUserResType, LoginUserReqBodyType>({
      query: (body) => ({
        url: "/verify/phoneNumber",
        method: "POST",
        body,
      }),
    }),
   
    logoutUser:builder.query({
      query:()=>'/logout'
    })
  

  }),
});

export const {
  useUserRegisterMutation,
  useVerifyUserMutation,
  useUpdateUserMutation,
  useLoginUserMutation,
  useLogoutUserQuery
} = userAPI;
