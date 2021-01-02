import React from 'react'
import { Link} from "react-router-dom";
import './navbar.less';

export default function Navbar()
{
    return (
        <div className="navbar-content">
            <Link className="back-link" to="/">HOME</Link>
            <Link className="back-link" to="/about">ABOUT</Link>
        </div>
    );
}
