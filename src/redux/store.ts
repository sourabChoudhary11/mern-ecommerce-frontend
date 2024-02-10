import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { orderApi } from "./api/orderApi";
import { paymentApi } from "./api/paymentApi";
import { statsApi } from "./api/statsApi";
import { cartReducer } from "./reducer/cartReducer";

export const server = import.meta.env.VITE_BACKEND_SERVER;

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
    },
    middleware: (dM) => dM().concat(userApi.middleware, productApi.middleware, orderApi.middleware, statsApi.middleware, paymentApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;