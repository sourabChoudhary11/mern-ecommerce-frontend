import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNewUserMutation } from "../redux/api/userApi";
import { MessageResponse } from "../types/apiTypes";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {

    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("male");
    const [dob, setDob] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordType, setPasswordType] = useState<string>("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password");

    const [newUser] = useNewUserMutation();

    const registerHandler = async () => {
        try {

            if (password !== confirmPassword) {
                setPassword("");
                setConfirmPassword("");
                return toast.error("Password & Confirm Password Didn't Matched");
            }
            const response = await newUser({
                name,
                gender,
                dob,
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
            toast.error("Sign Up Fail")
        }
    };

    const tooglePasswordType = () => {
        setPasswordType(prev => prev === "password" ? "text" : "password");
    }
    const toogleConfirmPasswordType = () => {
        setConfirmPasswordType(prev => prev === "password" ? "text" : "password");
    }

    return (
        <div className="login-register">
            <main>
                <h1>Register</h1>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="gender-section">
                    <label>Gender</label>
                    <div>
                        <input checked={gender==="male"} type="radio" name="gender" value={"male"} onChange={(e) => setGender(e.target.value)} />Male
                        <input type="radio" name="gender" value={"female"} onChange={(e) => setGender(e.target.value)} />Female
                    </div>
                </div>
                <div>
                    <label>DOB</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </div>
                <div className="show-password">
                    <label>Password</label>
                    <div>
                        <input type={passwordType} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <span onClick={tooglePasswordType}>
                            {
                                passwordType === "password" ? <FaEye /> : <FaEyeSlash />
                            }
                        </span>
                    </div>
                </div>
                <div className="show-password">
                    <label>Confirm Password</label>
                    <div>
                        <input type={confirmPasswordType} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <span onClick={toogleConfirmPasswordType}>
                            {
                                confirmPasswordType === "password" ? <FaEye /> : <FaEyeSlash />
                            }
                        </span>
                    </div>
                </div>
                <div>
                    <button onClick={registerHandler}>
                        Register
                    </button>
                </div>
                <div className="is-account">
                    <p>Have a Account?</p>
                    <Link to={"/login"}>
                        <span>Login</span>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Register