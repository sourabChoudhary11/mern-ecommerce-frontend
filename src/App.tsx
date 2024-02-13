import { lazy, Suspense, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Loader from "./components/Loader"
import ProtectedRoute from "./components/ProtectedRoute"
import { getUser } from "./redux/api/userApi"
import { userExist, userNotExist } from "./redux/reducer/userReducer"
import { RootState } from "./redux/store"
import Register from "./pages/Register"

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));

// admin routes

const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

const App = () => {

  const { user, loading } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  // useEffect(() => {
  //     if (user) {
  //       const data = await getUser(user.uid);
  //       dispatch(userExist(data?.user!));
  //     } else {
  //       dispatch(userNotExist());
  //     }
  // }, [])


  return(
    <BrowserRouter>
      <Header user={user} />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={
            <ProtectedRoute
              isAuthenticated={!user ? true : false}
            />
          }>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>


          {/* logged in user routes */}

          <Route element={
            <ProtectedRoute
              isAuthenticated={user ? true : false}
            />
          }>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>


          {/* admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />

            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />

            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter >
  )
}

export default App