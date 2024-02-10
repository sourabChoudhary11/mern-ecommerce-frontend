import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, MessageResponse, OrderResponse, ProcessOrderRequest } from "../../types/apiTypes";
import { UserOrderRequest } from "../../types/types";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/order/` }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        allOrders: builder.query<AllOrdersResponse, string>({
            query: (id) => `all?id=${id}`,
            providesTags: ["Orders"]
        }),
        userOrders: builder.query<AllOrdersResponse, string>({
            query: (id) => `my?id=${id}`,
            providesTags: ["Orders"]
        }),
        getSpecificOrder: builder.query<OrderResponse, string>({
            query: (id) => id,
            providesTags: ["Orders"]
        }),
        processOrder: builder.mutation<MessageResponse, ProcessOrderRequest>({
            query: ({ user_id, order_id }) => ({
                url: `${order_id}?id=${user_id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Orders"]
        }),
        deleteOrder: builder.mutation<MessageResponse, ProcessOrderRequest>({
            query: ({ user_id, order_id }) => ({
                url: `${order_id}?id=${user_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"]
        }),
        newOrder: builder.mutation<MessageResponse, UserOrderRequest>({
            query: order => ({
                url: "new",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["Orders"]
        })
    })
});

export const {
    useNewOrderMutation,
    useProcessOrderMutation,
    useDeleteOrderMutation,
    useGetSpecificOrderQuery,
    useAllOrdersQuery,
    useUserOrdersQuery
} = orderApi;
