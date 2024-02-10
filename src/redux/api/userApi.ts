import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllUsersResponse, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/apiTypes";

import { User } from "../../types/types";

export const userApi = createApi({
    reducerPath: "userApi",
    tagTypes: ["users"],
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/` }),
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
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
        })
    })
});

export const getUser = async (id: string) => {

    const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/${id}`);
    const data: UserResponse = await res.json();
    return data;
};
export const { useLoginMutation, useGetAllUsersQuery, useDeleteUserMutation } = userApi;
