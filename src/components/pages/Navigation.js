import React from 'react'
import { Link } from 'react-router-dom'
import {FaHome} from "react-icons/fa";
import {BsBookmarkHeartFill} from "react-icons/bs";
import {AiOutlineLogin, AiFillPlusCircle, AiOutlineLogout} from "react-icons/ai";
import SearchBar from '../Movies/SearchBar';
import SignOut from './SignOut';
import { useAuthStatus } from '../hooks/useAuth';


export default function Navigation() {
    const { signedIn } = useAuthStatus();

  return (
    <nav>
        <ul>
            <li >
                <Link to="/" style={{color: "white"}}>
                    <FaHome size={50} alt="home" />
                    <p>Home</p>
                </Link>
            </li>
            {/* <li>
                <Link to="/favorites" style={{color: "white"}}>
                    <BsBookmarkHeartFill size={50} alt="favorites" />
                    <p>Favorites</p>
                </Link>
            </li> */}
            <li>
                {signedIn 
                        ? <Link to="/sign-out" style={{color: "white"}}>
                            <AiOutlineLogout size={50} alt="sign out" />
                            <p>Sign Out</p>
                        </Link>
                        : <Link to="/sign-in" style={{color: "white"}}>
                            <AiOutlineLogin size={50} alt="sign in" />
                            <p>Sign In</p>
                        </Link>
 
                    }
            </li>
            <li>
                <Link to="/sign-up" style={{color: "white"}}>
                    <AiFillPlusCircle size={50} alt="sign up" />
                    <p>Sign Up</p>
                </Link>
            </li>
        </ul>
    </nav>
  )
}
