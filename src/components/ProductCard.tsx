import { FaPlus } from "react-icons/fa6";
import { CartItem } from "../types/types";

type Product_Card_Props = {
    _id: string;
    name: string;
    photo: string;
    price: number,
    stock: number;
    handler: (cartItem: CartItem) => string | undefined;
}

const ProductCard = ({ _id, name, photo, price, stock, handler }: Product_Card_Props) => {
    return (
        <div className="product-card">
            <img src={`${import.meta.env.VITE_BACKEND_SERVER}/${photo}`} alt={name} />
            <p>{name}</p>
            <span>Rs.{price}</span>

            <div>
                <button onClick={() => handler({
                    product_id: _id,
                    name,
                    photo,
                    price,
                    stock,
                    quantity: 1
                })}>
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default ProductCard