import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useState, useEffect, useRef } from "react";


//check if user is signed in
export const useAuthStatus = () =>{
    const [signedIn, setSignedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const isMounted = useRef(true);
    const [useremail, setUseremail] = useState("Guest");
    const [userUid, setUserUid] = useState("");


    useEffect(() =>{
        if(isMounted){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) =>{
            if (user) {
                setSignedIn(true);
                setUseremail(user.email);
                setUserUid(user.uid);
            }
            else {
                setSignedIn(false);
            }
            setCheckingStatus(false);
            });
        }
        return () => {
            isMounted.current = false;
        }
    }, [isMounted]);
    return {signedIn, checkingStatus, userUid, useremail};
}