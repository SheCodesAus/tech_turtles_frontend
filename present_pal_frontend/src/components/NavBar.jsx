import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import '../styles.css';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <button className="hamburger" onClick={toggleMenu}>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>
                    <Link to="/" className="logo-link">
                        <img src="img\logo1.png" alt="Present Pal Logo" className="nav-logo" />
                    </Link>
                </div>

                {/* <div className="search-container">
                    <input 
                        type="search" 
                        placeholder="Search" 
                        className="search-input"
                    />
                    <button className="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div> */}

                <div className="nav-right">
                    <Link to="/login" className="profile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </Link>
                </div>
            </nav>

            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/lists" onClick={toggleMenu}>Shopping Lists</Link>
                <Link to="/login" onClick={toggleMenu}>Login</Link>
                <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
            </div>

            <main className="content">
                <Outlet />
            </main>
        </>
    );
}

export default NavBar;