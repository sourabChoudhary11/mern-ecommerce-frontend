import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllUsersResponse, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/apiTypes";

import { LoginUser, User } from "../../types/types";

export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["users"],
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/` }),
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, LoginUser>({
            query: user => ({
                url: "login",
                method: "POST",
                body: user,
            })
        }),
        logout: builder.mutation<MessageResponse, string>({
            query: () => ({
                url: "logout",
                method: "POST",
            })
        }),
        newUser: builder.mutation<MessageResponse, User>({
            query: user => ({
                url: "new",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"]
        }),
        deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
            query: ({ user_id, admin_id }) => ({
                url: `${user_id}?id=${admin_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["users"]
        }),
        getAllUsers: builder.query<AllUsersResponse, string>({
            query: (id) => `all?id=${id}`,
            providesTags: ["users"]
        }),
        getUser: builder.query<UserResponse, string>({
            query: (id) => id,
            providesTags: ["users"]
        })
    })
});

export const { 
    useLoginMutation, 
    useGetAllUsersQuery, 
    useDeleteUserMutation, 
    useGetUserQuery,
    useLogoutMutation,
    useNewUserMutation
} = userApi;
