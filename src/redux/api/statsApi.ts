import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarChartsResponse, DashboardStatsResponse, LineChartsResponse, PieChartsResponse } from "../../types/apiTypes";


export const statsApi = createApi({
    reducerPath: "statsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/dashboard/` }),
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardStatsResponse, string>({
            query: (id) => `stats?id=${id}`
        }),
        getPieCharts: builder.query<PieChartsResponse, string>({
            query: (id) => `pie?id=${id}`
        }),
        getLineCharts: builder.query<LineChartsResponse, string>({
            query: (id) => `line?id=${id}`
        }),
        getBarCharts: builder.query<BarChartsResponse, string>({
            query: (id) => `bar?id=${id}`
        })
    })
});

export const {
    useGetBarChartsQuery,
    useGetDashboardStatsQuery,
    useGetPieChartsQuery,
    useGetLineChartsQuery
} = statsApi;