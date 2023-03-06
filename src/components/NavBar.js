import React from 'react'
import { Link } from "react-router-dom";
function NavBar() {
    return (
        <div className='navbar'>
            <div className='logo'>
                Pilot
            </div>
            <div className='navbar-menu'>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                <Link to="/blog" style={{ textDecoration: 'none', color: 'white' }}>Blog</Link>
                <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>Contact</Link>
            </div>
        </div >
    )
}

export default NavBar