import { CirclePlus} from 'lucide-react';
import './ListItem.css';
import React, { useState } from 'react';
import postShareRecipient from '../api/post-share-recipient.js';
import Modal from './Modal.jsx';

const SharedItem = (props) => {
	const [recipient, setRecipient] = useState(props.recipient);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [itemData, setItemData] = useState({
		name: '',
		cost: 0,
		recipient: parseInt(recipient.id),
		where_to_buy: '',
		notes: ''
	});

	const handleSave = async () => {
		try {
			await postShareRecipient(props.uuid, itemData);
			await props.refreshList();
			setItemData({
				name: '',
				cost: 0,
				recipient: parseInt(recipient.id),
				where_to_buy: '',
				notes: ''
			});
			setIsModalOpen(false);
		} catch (error) {
			console.error('Failed to save an item:', error);
		}
	};

	const handleInputChange = (e) => {
		setItemData({
			...itemData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className='list-item--container mb-8'>
			<h3 className='list-item--title text-gray-950 font-semibold text-xl'>{recipient.name}</h3>

			{/* Desktop Table View */}
			<div className="hidden md:grid md:grid-cols-4 gap-4 mb-4">
				<div className="text-base font-semibold text-gray-950">Product name</div>
				<div className="text-base font-semibold text-gray-950">Store</div>
				<div className="text-base font-semibold text-gray-950">Price</div>
				<div className="text-base font-semibold text-gray-950">Notes</div>
				{recipient.items.map(gift => (
					<React.Fragment key={gift.id}>
						<div className="p-3 rounded">{gift.name}</div>
						<div className="p-3 rounded">{gift.where_to_buy}</div>
						<div className="p-3 rounded">
							${parseInt(gift.cost).toFixed(2)}
						</div>
						<div className="p-3 rounded flex justify-between items-center">
							<span>{gift.notes}</span>
						</div>
					</React.Fragment>
				))}
			</div>

			{/* Mobile Card View */}
			<div className="md:hidden space-y-4">
				{recipient.items.map(gift => (
					<div
						key={gift.id}
						className="p-4 rounded-lg shadow-sm"
					>
						<div className="flex justify-between items-center mb-2">
							<div className="font-medium flex items-center gap-2">
								{gift.name}
							</div>
						</div>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-950">Store:</span>
								<span>{gift.where_to_buy}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-950">Price:</span>
								<span>${parseInt(gift.cost).toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-950">Notes:</span>
								<span>{gift.notes}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex justify-end">
				<div className="flex flex-col gap-2 pt-4 pb-4">
					<div className="flex items-center gap-2 justify-end cursor-pointer" onClick={() => setIsModalOpen(true)}>
						<span>Add more item</span>
						<CirclePlus color="#5B4B8A" size={24} />
					</div>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSave}
			>
				<input
					type="text"
					name="name"
					placeholder="Item Name"
					className="p-2 border-gray-500 border rounded"
					value={itemData.name}
					onChange={handleInputChange}
				/>
				<input
					type="number"
					name="cost"
					placeholder="Budget for This Item"
					className="p-2 border-gray-500 border rounded"
					value={itemData.cost}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="where_to_buy"
					placeholder="Where to Buy This Item"
					className="p-2 border-gray-500 border rounded"
					value={itemData.where_to_buy}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="notes"
					placeholder="Notes for The Item"
					className="p-2 border-gray-500 border rounded"
					value={itemData.notes}
					onChange={handleInputChange}
				/>
			</Modal>
		</div>
	);
};

export default SharedItem;
