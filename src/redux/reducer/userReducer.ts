import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { User_Reducer_Initial_State } from "../../types/reducerTypes";
import { User } from "../../types/types";

const initialState: User_Reducer_Initial_State = {
    user: null,
    loading: true
};

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload
        },
        userNotExist: (state) => {
            state.loading = false;
            state.user = null
        }
    }
})


export const {userExist, userNotExist} = userReducer.actions;