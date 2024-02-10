import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type Cart_Item_Props = {
    cartItem: CartItem;
    incrementHandler: (product_id: string) => void;
    decrementHandler: (product_id: string) => void;
    deleteHandler: (product_id: string) => void;
}


const CartItem = ({ cartItem, incrementHandler, decrementHandler, deleteHandler }: Cart_Item_Props) => {

    const { photo, product_id, quantity, price, name, stock } = cartItem;

    return (
        <div className="cart-item">
            <img src={`${server}/${photo}`} alt={name} />
            <article>
                <Link to={`/product/${product_id}`}>{name}</Link>
                <span>Rs.{price}</span>
            </article>
            <div>
                <button disabled={quantity===1} onClick={() => decrementHandler(product_id)}>-</button>
                <p>{quantity}</p>
                <button onClick={
                    () => {
                        if (quantity === stock) {
                            toast.error("Out of Stock");
                        } else {
                            incrementHandler(product_id);
                        }
                    }
                }>+</button>
            </div>
            <button onClick={() => deleteHandler(product_id)}>
                <FaTrash />
            </button>
        </div>
    )
}

export default CartItem