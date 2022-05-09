import React from 'react';
import {FaFacebook, FaTwitter, FaLinkedin, FaInfoCircle, FaInstagram} from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
        <h2>© Kira Luethe 2022</h2>
        <div className="links">
            {/* <FaFacebook size={30} />
            <FaTwitter size={30} />
            <FaLinkedin size={30} />
            <FaInstagram size={30} /> */}

            <Link to="/about" style={{color: "white"}}>
              <FaInfoCircle size={30} alt="about" />
            </Link>
            
        </div>
    </div>
  )
}
