import React from 'react';
import {FaInfoCircle} from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
        <h2>© Kira Luethe 2022</h2>
        <div className="links">
            <Link to="/about" style={{color: "white"}}>
              <FaInfoCircle size={30} alt="about" />
            </Link>
        </div>
    </div>
  )
}
