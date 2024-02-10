import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { Cart_Reducer_Initial_State } from "../../types/reducerTypes";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: Cart_Reducer_Initial_State = {
    loading: false,
    cartItems: [],
    subTotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    }
};

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        calculate: (state) => {
            state.subTotal = state.cartItems.reduce((total, initial) => total + (initial.price * initial.quantity), 0);
            state.tax = Math.round(state.subTotal * 0.18);
            state.shippingCharges = state.subTotal > 1000 || state.subTotal==0 ? 0 : 200;
            state.total = state.subTotal + state.tax + state.shippingCharges - state.discount;
        },
        addToCart: function (state, action: PayloadAction<CartItem>) {
            const payloadProductId = action.payload.product_id;
            const isProductExist = state.cartItems.find(i => i.product_id === payloadProductId);
            if (!isProductExist) {
                state.cartItems.push(action.payload);
            }
        },
        increment: (state, action: PayloadAction<string>) => {
            const index = state.cartItems.findIndex(i => i.product_id === action.payload);
            state.cartItems[index].quantity += 1;
        },
        decrement: (state, action: PayloadAction<string>) => {
            const index = state.cartItems.findIndex(i => i.product_id === action.payload);
            state.cartItems[index].quantity -= 1;
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                i => i.product_id !== action.payload
            );
        },
        applyDiscount: (state, action:PayloadAction<number>) =>{
            state.discount = action.payload;
        },
        storeShippingInfo: (state, action:PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
        },
        resetCart: ()=>initialState
    }
})

export const { addToCart, removeCartItem, decrement, increment, calculate, applyDiscount, storeShippingInfo, resetCart } = cartReducer.actions;