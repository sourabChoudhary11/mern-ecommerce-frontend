import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { applyDiscount, calculate, decrement, increment, removeCartItem } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";

const Cart = () => {

  const { cartItems, subTotal, tax, total, shippingCharges, discount } = useSelector((state: RootState) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const incrementHandler = (id: string) => {
    dispatch(increment(id));
  }
  const decrementHandler = (id: string) => {
    dispatch(decrement(id));
  }
  const deleteHandler = (id: string) => {
    dispatch(removeCartItem(id));
  }

  const getCoupon = async (signal: AbortSignal) => {
    const fetchedData = await fetch(`${server}/api/v1/payment/discount?coupon=${couponCode}`, { signal });
    const data = await fetchedData.json();
    if (data.success === false) throw new Error("Invalid Coupon");
    return data;
  };

  useEffect(() => {
    const { abort, signal } = new AbortController();
    const timerId = setTimeout(() => {
      getCoupon(signal).then((res) => {
        setIsValidCouponCode(true);
        dispatch(applyDiscount(res.coupon.amount))
      }).catch(() => {
        setIsValidCouponCode(false);
        dispatch(applyDiscount(0))
      });
    }, 1000)
    return () => {
      clearTimeout(timerId);
      if(signal.aborted) abort();
    }
  }, [couponCode])

  useEffect(() => {
    dispatch(calculate());
  }, [cartItems, discount])

  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? cartItems.map((i) => (
            <CartItem key={i.product_id} cartItem={i} incrementHandler={incrementHandler} decrementHandler={decrementHandler} deleteHandler={deleteHandler} />
          )
          ) : <h1>No Items Added</h1>
        }
      </main>
      <aside>
        <p>Subtotal: Rs.{subTotal}</p>
        <p>Shipping Charges: Rs.{shippingCharges}</p>
        <p>Tax: Rs.{tax}</p>
        <p>
          Discount <em> -
            Rs.{discount}
          </em>
        </p>
        <p>
          <b>Total: Rs.{total}</b>
        </p>

        <input type="text" value={couponCode} onChange={(e) => {
          setCouponCode(e.target.value)
        }} placeholder="Coupon Code" />
        {
          couponCode && (
            isValidCouponCode ?
              <span className="green">Rs.{discount} off using the <code>{couponCode}</code></span> :
              <span className="red"><VscError /> Invalid Coupon Code</span>
          )
        }
        {
          cartItems.length > 0 && <Link to="/shipping">
            Checkout
          </Link>
        }
      </aside>
    </div>
  )
}

export default Cart