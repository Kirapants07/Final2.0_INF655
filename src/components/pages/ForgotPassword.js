import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../shared/Card';
import Header from './Header';
import Navigation from './Navigation';


export default function ForgotPassword() {
    const [email,setEmail] = useState("");

    const handleChange = (e) => setEmail(e.target.value);
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            alert("Please check your email for your reset password link");
            setEmail("");
        } catch (err){
            alert(err);
        }
    }
        
  return (
    <div>
        <Header />
        <Navigation />
        <form className="loginInput" onSubmit={handleSubmit}>
        <Card >
            <h1>Reset Password</h1>
            <div>
                <input type="email" 
                className= "inputbox"
                placeholder="Email"
                id="email"
                value={email}
                onChange={handleChange}
                />
            </div>
            <Link to="/sign-in" className="signuplinks"><p>Sign In</p></Link>
            <div>
                <button>Email Reset Link</button>
            </div>
        </Card>
    </form>
</div>
  )
}
