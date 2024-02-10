import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useAllCategoriesQuery, useSearchProductQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Search = () => {
  const dispatch = useDispatch();
  const { data: categoriesData } = useAllCategoriesQuery("");

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data: searchProducts} = useSearchProductQuery({
    name: search,
    price: maxPrice,
    category,
    page,
    sort
  });

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock<1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Item Added to Cart");
  }

  const isPrevPage = page > 1;
  const isNextPage = page < searchProducts?.totalPages!;

  return (
    <div className="product-search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price {maxPrice || ""}</h4>

          <input type="range" value={maxPrice} min={0} max={100000} onChange={(e) => setMaxPrice(Number(e.target.value))}>
          </input>
        </div>

        <div>
          <h4>Category</h4>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            {
              categoriesData?.categories.map((i, index) => (
                <option key={index} value={i}>{i[0].toUpperCase() + i.slice(1)}</option>
              ))
            }
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search By Name..." value={search} onChange={(e) => setSearch(e.target.value)} />


        <div className="search-product-list">
          {
            searchProducts?.products.map(p => (
              <ProductCard _id={p._id} name={p.name} price={p.price} stock={p.stock} handler={addToCartHandler} photo={p.photo} />
            ))
          }
        </div>

        {
          (searchProducts?.totalPages!) > 1 && <article>
            <button disabled={!isPrevPage} onClick={() => setPage(prev => prev - 1)}>Prev</button>
            <span>{page} of {searchProducts?.totalPages}</span>
            <button disabled={!isNextPage} onClick={() => setPage(prev => prev + 1)}>Next</button>
          </article>
        }
      </main>
    </div>
  )
}

export default Search