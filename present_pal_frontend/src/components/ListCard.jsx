import { Link } from "react-router-dom";
import logoImg from '../assets/logos/logo-pink-bg.png';
import { Trash2 } from "lucide-react";
import deleteList from "../api/delete-list";
import Modal from './Modal.jsx';
import { useState } from "react";

function ListCard(props) {
	const { listData } = props;
	const domain = window.location.origin;
	const listLink = `${domain}/lists/${listData.id}`;
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSave = async () => {
		try {
			await deleteList(listData.id);
			await props.refreshList();
		} catch (error) {
			console.error("Failed to delete the list:", error);
		}
	}

	return (
		<>
			<Link to={listLink}>
				<div className="w-64 bg-purple-100 rounded-lg shadow-md p-4">
					<h2 className="text-lg h-14 font-semibold mb-2 line-clamp-2">{listData.name}</h2>
					<p className="text-sm text-gray-600 mb-3 text-center min-h-12">{listData.description}</p>
					<div className="flex justify-center mb-2">
						<img src={logoImg} alt="PresentPal Logo" className="w-32" />
					</div>
					<div className="flex items-center justify-between mt-4">
						<div className="flex flex-row gap-2">
							<span className="text-md text-gray-600">Budget:</span>
							<span className="font-medium">{`$${listData.budget}`}</span>
						</div>
						<div className="p-2">
							<Trash2 className="hover:scale-110 hover:text-red-600 transform transition-all duration-200"
								onClick={(e) => {
									e.preventDefault();
									setIsModalOpen(true);
								}} />
						</div>
					</div>
				</div>
			</Link>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSave}
			>
				<h3>{`You are deleting the "${listData.name}" list, are you sure?`}</h3>
			</Modal>
		</>
	);
}

export default ListCard;
