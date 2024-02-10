import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CouponValidateResponse, CouponsResponse, MessageResponse, PaymentIntentResponse } from "../../types/apiTypes";
import { Coupon } from "../../types/types";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/payment/` }),
    endpoints: (builder) => ({
        allCoupons: builder.query<CouponsResponse, string>({
            query: (id) => `all?id=${id}`
        }),
        deleteCoupon: builder.mutation<MessageResponse, string>({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            })
        }),
        applyDiscount: builder.query<CouponValidateResponse, string>({
            query: (coupon) => `discount$coupon${coupon}`
        }),
        newCoupon: builder.mutation<MessageResponse, Coupon>({
            query: ({couponCode: coupon, amount}) => ({
                url: "new",
                method: "POST",
                body: {
                    coupon,
                    amount
                },
            })
        }),
        createPaymentIntent: builder.mutation<PaymentIntentResponse, number>({
            query: (amount) => ({
                url: "create",
                method: "POST",
                body: {
                    amount
                },
            })
        })
    })
});

export const {
    useCreatePaymentIntentMutation,
    useAllCouponsQuery,
    useDeleteCouponMutation,
    useApplyDiscountQuery,
    useNewCouponMutation
} = paymentApi;
