import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import { User } from "../types/types";
import { toast } from "react-hot-toast";
import { useLogoutMutation } from "../redux/api/userApi";

const Header = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout("");
      toast.success("Sign Out Successfully");
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      toast.success("Sign Out Fail");
      setIsOpen(false);
    }
  }

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        Home
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>

      {
        user?._id ? (
          <>
            <button onClick={() => setIsOpen(prev => !prev)}>
              <FaUser />
            </button>
            <dialog open={isOpen} >
              <div>
                {
                  user.role === "admin" && (
                    <Link onClick={() => setIsOpen(prev => !prev)} to="/admin/dashboard">Admin</Link>
                  )
                }
                <Link onClick={() => setIsOpen(false)} to="/order">
                  Orders
                </Link>
                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )
      }

    </nav>
  )
}

export default Header