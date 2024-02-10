import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import { toast } from "react-hot-toast";
import {FcGoogle} from 'react-icons/fc'
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import { MessageResponse } from "../types/apiTypes";

const Login = () => {

    const [gender, setGender] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const [login] = useLoginMutation();

    const loginHandler = async ()=>{
        try {
            
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth, provider);

            const response = await login({
                name: user.displayName!,
                email: user.email!,
                photo:user.photoURL!,
                gender,
                role: "user",
                dob: date,
                _id: user.uid
            });

            if("data" in response) {
                toast.success(response.data.message);
            }else{
                const error = response.error as  FetchBaseQueryError;
                const data = error.data as MessageResponse;
                toast.error(data.message);
            }

        } catch (error) {
            toast.error("Sign In Fail")
        }
    };

  return (
    <div className="login">
        <main>
            <h1>Login</h1>
            <div>
                <label>Gender</label>
                <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div>
                <label>Date of Birth</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            </div>
            <div>
                <p>Already Signed In Once</p>
                <button onClick={loginHandler}>
                    <FcGoogle />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login