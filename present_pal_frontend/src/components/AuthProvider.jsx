import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		return localStorage.getItem('token') !== null;
	});

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user_id');
		localStorage.removeItem('email');
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
			{props.children}
		</AuthContext.Provider>
	);
};
