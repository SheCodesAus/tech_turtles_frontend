import { useNavigate } from 'react-router-dom';

import notfoundImg from '../assets/notfound.png';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-8">404</h1>
                <div className="mb-8">
                    <img
                        src={notfoundImg}
                        alt="404 illustration"
                        className="mx-auto rounded-lg shadow-lg w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover"
                    />
                </div>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 text-white bg-purple-800 rounded-md transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;