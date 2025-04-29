import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use this for actual routing


function NavBar_1() {
  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  // 🔸 Menu items array (can be reused anywhere)
  const menuItems = [
    { label: 'Home🏠', path: '/' },
    { label: 'Admin Login🔐', path: '/adminsignin' },
    { label: 'Faculty Login🔐', path: '/facultysignin' },
    { label: 'Student Login🔐', path: '/studentsignin' },
    { label: 'About Us📄', path: '/aboutpage' },
  ];

  return (
    <nav className={nav ? 'nav active' : 'nav'}>
      {/* Logo (optional, uncomment if needed) */}
      {/* <Link to="#" className="logo">
        <img src={logo} alt="Logo" />
      </Link> */}

      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="nav-icon"></span>
      </label>

      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar_1;
