import React, {useState} from 'react'
import {Link} from "react-router-dom";
import Card from '../shared/Card';
import Header from './Header';
import Navigation from './Navigation';


export default function SignIn() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} =formData;
    const handleChange = (e) => {
        setFormData((previousState) =>({
            ...previousState,
            [e.target.id]: e.target.value,
        }));
    };
  return (
    <div>
        <Header />
        <Navigation />
        <form className="loginInput">
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
