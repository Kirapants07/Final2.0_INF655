import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function SignOut() {

    const navigate = useNavigate();

    const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful. Return to homepage
        navigate('/');
        }).catch((error) => {
        // An error happened.
        });
        
}
