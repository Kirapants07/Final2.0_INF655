import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Card from '../shared/Card';
import Header from './Header';
import Navigation from './Navigation';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { db } from '../../firebase.config';
import {doc , setDoc } from "firebase/firestore";

export default function SignUp() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const {name, email, password} = formData;

    const handleChange = (e) => {
        setFormData((previousState) =>({
            ...previousState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //send values to firebase
            const auth = getAuth();

            //register user
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
 
            const user = userCredentials.user;
            updateProfile(auth.currentUser, {displayName: name});

            //add user data, without password in database collection
            const formDataCopy = {...formData};
            delete formDataCopy.password;

            await setDoc(doc(db, "users", user.uid), formDataCopy);

            //go to homepage
            alert("New account created");
            navigate("/");
        }catch (err) {
            alert(err);
        }
    }
  return (
    <div>
        <Header />
        <Navigation />
        <form className="loginInput" onSubmit = {handleSubmit}>
            <Card >
                <h1>Create An Account</h1>
                <div>
                    <input type="text" 
                    className= "inputbox"
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    />
                </div>
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
                <Link to="/sign-in" className="signuplinks"><p>Already have an account? Sign In</p></Link>
                <div>
                    <button>Sign Up</button>
                </div>
            </Card>
        </form>

    </div>
  )
}
