import { CartItem, ShippingInfo, User } from "./types";

export interface User_Reducer_Initial_State {
    user: User | null;
    loading: boolean;
}

export interface Cart_Reducer_Initial_State {
    loading: boolean;
    cartItems:CartItem[];
    subTotal:number;
    tax:number;
    shippingCharges: number;
    discount: number;
    total:number;
    shippingInfo: ShippingInfo;
}

