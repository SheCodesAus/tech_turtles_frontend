import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
