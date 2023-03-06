import React from 'react'
//import './App.css'
function NavBar() {
    return (
        <div className='navbar'>
            <div className='logo'>
                logo goes here
            </div>
            <div className='navbar-menu'>
                <li><a href='/'>Home</a></li>
                <li><a href='/blog'>Blog</a></li>
                <li><a href='/contact'>Contact</a></li>
            </div>
        </div>
    )
}

export default NavBar