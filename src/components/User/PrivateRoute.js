import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuth';


export default function PrivateRoute() {
    const {signedIn, checkingStatus} = useAuthStatus();
    if (checkingStatus){
        return;
    }



  return ( loggedIn ? <Outlet /> : <Navigate to="/sign-in" />)
}
