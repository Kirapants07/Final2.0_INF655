import React, {useState} from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom";
import Card from '../shared/Card';
import Header from './Header';
import Navigation from './Navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function SignIn() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const {email, password} =formData;
    const handleChange = (e) => {
        setFormData((previousState) =>({
            ...previousState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {

        try{
            e.preventDefault();
            const auth = getAuth();
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            if (userCredentials.user){
                navigate("/");
            }
        } catch (err) {
            alert(err);
        }

    }
  return (
    <div>
        <Header />
        <Navigation />
        <form className="loginInput" onSubmit={handleSubmit}>
            <Card >
            <h1>Sign In</h1>
                <div>
                    <input type="email" 
                    className= "inputbox"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <input type="password" 
                    className= "inputbox"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    />
                </div>
                <Link to="/forgot-password" className="signuplinks"><p>Forgot Password?</p></Link>
                <Link to="/sign-up" className="signuplinks"><p>Create New Account</p></Link>
                <div>
                    <button>Sign In</button>
                </div>
            </Card>
        </form>

    </div>
  )
}
