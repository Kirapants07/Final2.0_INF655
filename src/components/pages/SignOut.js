import React from 'react';
import { getAuth, signOut } from "firebase/auth";

export default function SignOut() {
    const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
}
