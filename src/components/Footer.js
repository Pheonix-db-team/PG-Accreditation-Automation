import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    {/* Replace with your logo image when ready */}
                    <div className="phoenix-logo-glow">
                        🔥 <span className="phoenix-title">Phoenix DB Team</span>
                    </div>
                    <p className="footer-subtext">
                        Forged in the fires of SEM II's DBMS project — a team that rose, coded, and conquered.
                    </p>
                    <p className="footer-subtext">
                        Not just a project. A legacy of logic, learning, and late-night debugging.
                    </p>
                </div>
                <div className="footer-right">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                © {new Date().getFullYear()} Phoenix DB Team. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;
