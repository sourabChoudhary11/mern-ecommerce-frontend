import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useLatestProductQuery } from "../redux/api/productApi"
import { CartItem } from "../types/types";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {

  const { data } = useLatestProductQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Item Added to Cart");
  }

  return (
    <div className="home">
      <section></section>
      <h1>
        <span>
          Latest Products
        </span>
        <Link to={"/search"}>
          More
        </Link>
      </h1>

      <main>
        {
          data?.products.map(p => (
            <ProductCard key={p._id} _id={p._id} name={p.name} price={p.price} stock={p.stock} handler={addToCartHandler} photo={p.photo} />
          ))
        }
      </main>

    </div>
  )
}

export default Home