import  { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button'
import { Link } from "react-router-dom";
import logoImg from '../assets/logos/logo-pink-bg.png';
// import '../styles.css';
import './NavBar.css';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
		setIsOpen(false);
	};

    return (
        <nav className="navbar">
			<div className="nav-content">
				<div className="links-desktop">
					<Link to="/" onClick={closeMenu}>Home</Link>
					<Link to="#" onClick={closeMenu}>About Us</Link>
					<Link to="#" onClick={closeMenu}>Create List</Link>
				</div>
				<div className="brand">
					<Link to="/" className="header-logo">
						<img src={logoImg} alt="PresentPal Logo" />
					</Link>
				</div>
				<div className="links-desktop">	
					<Link to="/login">
						<Button size='small' variant='secondary'>Log In</Button>
					</Link>
					<Link to="/signup">
						<Button size='small' variant='secondary'>Sign Up</Button>
					</Link>
				</div>
				<div className="hamburger" onClick={toggleMenu}>
					<Menu size={24} />
				</div>
			</div>

			<div className={`slider ${isOpen ? "open" : ""}`}>
				<div className="close-btn" onClick={closeMenu}>
					<X size={24} />
				</div>
				<ul className="slider-links">
					<li>
						<Link to="/" onClick={closeMenu}>Home</Link>
					</li>
					<li>
						<Link to="#" onClick={closeMenu}>About Us</Link>
					</li>
					<li>
						<Link to="#" onClick={closeMenu}>Create List</Link>
					</li>
				</ul>
				<div className="slider-footer">
					<Link to="/login">
						<Button size='medium' variant='secondary'>Log In</Button>
					</Link>
					<Link to="/signup">
						<Button size='medium' variant='secondary'>Sign Up</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;