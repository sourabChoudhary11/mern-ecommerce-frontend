import { FormEvent, useState } from "react";

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { UserOrderRequest } from "../types/types";
import { responseToast } from "../utils/feature";


const stripePromie = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const stripe = useStripe();
    const elements = useElements();

    const { user } = useSelector((state: RootState) => state.userReducer);

    const { cartItems, discount, shippingInfo, shippingCharges, subTotal, tax, total } = useSelector((state: RootState) => state.cartReducer);

    const [processing, setProcessing] = useState<boolean>(false);

    const [newOrder] = useNewOrderMutation();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const order: UserOrderRequest = {
            user: user?._id!,
            shippingInfo,
            orderItems: cartItems,
            subTotal,
            tax,
            shippingCharges,
            discount,
            total
        };

        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin
            },
            redirect: "if_required"
        });

        if (error) {
            setProcessing(false);
            return toast.error(error.message || "Something Went Wrong");
        }

        if (paymentIntent.status === "succeeded") {
            const res = await newOrder(order);
            dispatch(resetCart());
            responseToast(res, navigate, "/orders");
        }
    };

    return <div className="checkout-container">
        <form onSubmit={submitHandler}>
            <PaymentElement />
            <button type="submit">
                {processing ? "Processing...." : "Pay"}
            </button>
        </form>
    </div>
}

const Checkout = () => {

    const location = useLocation();

    const clientSecret: string | undefined = location.state;

    if (!clientSecret) return <Navigate to={"/shipping"} />

    const options = {
        clientSecret
    }

    return <Elements stripe={stripePromie} options={options}>
        <CheckoutForm />
    </Elements>
}

export default Checkout