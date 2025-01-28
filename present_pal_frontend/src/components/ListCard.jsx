import { Link } from "react-router-dom";
import logoImg from '../assets/logos/logo-pink-bg.png';


function ListCard(props) {
    const { listData } = props;
    const domain = window.location.origin;
    const listLink = `${domain}/list/${listData.id}`;

    return (
        <Link to={listLink}>
        <div className="w-64 bg-purple-100 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">{listData.name}</h2>
            <p className="text-sm text-gray-600 mb-3 text-center min-h-12">{listData.description}</p>
            <div className="flex justify-center mb-2">
                <img src={logoImg} alt="PresentPal Logo" className="w-32" />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Budget:</span>
                <span className="font-medium">{listData.budget}</span>
            </div>
        </div>
        </Link>
    );
}

export default ListCard;
