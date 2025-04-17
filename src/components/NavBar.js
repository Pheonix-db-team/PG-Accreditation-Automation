import React from 'react';
import { Link } from "react-router-dom";

const NaviBar = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center items-center gap-3 px-4">
        {[
          { label: 'Home🏠', path: '/' },
          { label: 'Admin Login🔐', path: '/adminsignin' },
          { label: 'Faculty Login🔐', path: '/facultysignin' },
          { label: 'Student Login🔐', path: '/studentsignin' },
          { label: 'About📄', path: '/aboutpage' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-gray-200 text-black text-sm sm:text-base md:text-lg px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NaviBar;
