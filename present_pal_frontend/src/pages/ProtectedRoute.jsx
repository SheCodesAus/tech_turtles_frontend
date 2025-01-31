import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/use-auth.js';

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;
