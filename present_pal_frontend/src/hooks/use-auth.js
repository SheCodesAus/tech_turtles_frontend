import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider.jsx';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
