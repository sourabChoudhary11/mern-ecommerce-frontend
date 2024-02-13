import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/api/userApi";
import { MessageResponse } from "../types/apiTypes";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordType, setPasswordType] = useState<string>("password");

    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try {
            const response = await login({
                email,
                password
            });

            if ("data" in response) {
                toast.success(response.data.message);
            } else {
                const error = response.error as FetchBaseQueryError;
                const data = error.data as MessageResponse;
                toast.error(data.message);
            }

        } catch (error) {
            toast.error("Sign In Fail")
        }
    };

    const tooglePasswordType = () => {
        setPasswordType(prev => prev === "password" ? "text" : "password");
    }

    return (
        <div className="login-register">
            <main>
                <h1>Login</h1>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="show-password">
                    <label>Password</label>
                    <div>
                        <input type={passwordType} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span onClick={tooglePasswordType}>
                            {
                                passwordType === "password" ? <FaEye /> : <FaEyeSlash />
                            }
                        </span>
                    </div>
                </div>
                <div>
                    <button onClick={loginHandler}>
                        Login
                    </button>
                </div>
                <div className="is-account">
                    <p>Haven't Account?</p>
                    <Link to={"/register"}>
                        <span>Register</span>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Login