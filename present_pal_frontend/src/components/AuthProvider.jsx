import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
