import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button'
import { Link } from "react-router-dom";
import logoImg from '../assets/logos/logo-pink-bg.png';
import useAuth from "../hooks/use-auth.js";
import './NavBar.css';

function NavBar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	const { isLoggedIn, handleLogout } = useAuth();

	return (
		<nav className="navbar">
			<div className="nav-content">
				<div className="links-desktop">
					<Link to="/" onClick={closeMenu}>Home</Link>
					<Link to="/create-list" onClick={closeMenu}>Create List</Link>
					<Link to="/lists" onClick={closeMenu}>My List</Link>
				</div>
				<div className="brand">
					<Link to="/" className="header-logo">
						<img src={logoImg} alt="PresentPal Logo" />
					</Link>
				</div>
				<div className="links-desktop">
					{isLoggedIn ? (
						// Show logout when user is authenticated
						<Button
							size='small'
							variant='secondary'
							onClick={handleLogout}
						>
							Log Out
						</Button>
					) : (
						// Show login and signup when user is not authenticated
						<>
							<Link to="/login">
								<Button size='small' variant='secondary'>Log In</Button>
							</Link>
							<Link to="/signup">
								<Button size='small' variant='secondary'>Sign Up</Button>
							</Link>
						</>
					)}
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
						<Link to="/create-list" onClick={closeMenu}>Create List</Link>
					</li>
					<li>
						<Link to="/lists" onClick={closeMenu}>My List</Link>
					</li>
				</ul>
				<div className="slider-footer">
					{isLoggedIn ? (
						// Show logout in mobile menu when authenticated
						<Button
							size='medium'
							variant='secondary'
							onClick={handleLogout}
						>
							Log Out
						</Button>
					) : (
						// Show login and signup in mobile menu when not authenticated
						<>
							<Link to="/login">
								<Button size='medium' variant='secondary'>Log In</Button>
							</Link>
							<Link to="/signup">
								<Button size='medium' variant='secondary'>Sign Up</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
