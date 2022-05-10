import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useState, useEffect, useRef } from "react";


//check if user is signed in
export const useAuthStatus = () =>{
    const [signedIn, setSignedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const isMounted = useRef(true);

    useEffect(() =>{
        if(isMounted){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) =>{
            if (user) {
                //console.log(user.uid);
                //console.log(user.email);
                setSignedIn(true);
            }
            setCheckingStatus(false);
            });
        }
        return () => {
            isMounted.current = false;
        }
    }, [isMounted]);
    return {signedIn, checkingStatus};
}