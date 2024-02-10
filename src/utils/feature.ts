import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/apiTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-hot-toast";

type ResType = {
    data: MessageResponse;
} | {
    error: FetchBaseQueryError | SerializedError;
}


export const responseToast = (res: ResType, navigate: NavigateFunction | null, url: string) => {


    if ("data" in res) {
        toast.success(res.data.message);
        if (navigate) navigate(url);
    } else {
        const error = res.error as FetchBaseQueryError;
        const data = error.data as MessageResponse;
        toast.error(data.message);
    }

}

const months = ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

export const getMonths = () => {
    const get6Months: string[] =[];
    const get12Months: string[] =[];

    for (let i = 0; i < 6; i++) {
        const month = new Date();
        month.setMonth((new Date().getMonth())-i)+12%12;
        get6Months.unshift(months[month.getMonth()]);
    }

    for (let i = 0; i < 12; i++) {
        const month = new Date();
        month.setMonth((new Date().getMonth())-i)+12%12;
        get12Months.unshift(months[month.getMonth()]);
    }

    return ({
        get6Months,
        get12Months
    })
}