import ToggleSwitch from './ToggleSwitch';
import { Square, SquareCheckBig, Trash2, CirclePlus } from 'lucide-react';
import './ListItem.css';
import React, { useState } from 'react';
import postItem from '../api/post-item.js'
import putItem from '../api/put-item.js'
import putRecipient from '../api/put-recipient.js';
import deleteRecipient from '../api/delete-recipient.js';
import Modal from '../components/Modal.jsx';

const ListItem = (props) => {
	const [recipient, setRecipient] = useState(props.recipient);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [itemData, setItemData] = useState({
		name: '',
		cost: 0,
		recipient: parseInt(recipient.id),
		where_to_buy: '',
		notes: ''
	});

	const handleItemClick = (itemId) => {
		try {
			const item = recipient.items.find(i => i.id === itemId);
			const newStatus = item.status === 'complete' ? 'incomplete' : 'complete';
			putItem(itemId, newStatus);
			setRecipient(prev => ({
				...prev,
				items: prev.items.map(item =>
					item.id === itemId ? { ...item, status: newStatus } : item)
			}))
		} catch (error) {
			console.error('Error updating item status', error);
		}
	}

	const handleSave = async () => {
		try {
			await postItem(itemData);
			await props.refreshList();
			setItemData({
				name: '',
				cost: 0,
				recipient: parseInt(recipient.id),
				where_to_buy: '',
				notes: ''
			});
		} catch (error) {
			console.error('Failed to save an item:', error);
		}
	};

	const handleDeleteRecipient = async () => {
		try {
			await deleteRecipient(recipient.id);
			props.refreshList();
		} catch (error) {
			console.error('Failed to delete recipient:', error);
		}
	}

	const handleInputChange = (e) => {
		setItemData({
			...itemData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className='list-item--container mb-8'>
			<h3 className='list-item--title text-gray-950 font-semibold text-xl'>{recipient.name}</h3>
			<ToggleSwitch onToggle={() => {
				putRecipient(recipient.id, { is_open: !recipient.is_open })
				setRecipient(prev => ({
					...prev,
					is_open: !prev.is_open
				}))
			}} />

			{/* Desktop Table View */}
			<div className="hidden md:grid md:grid-cols-4 gap-4 mb-4">
				<div className="text-base font-semibold text-gray-950">Product name</div>
				<div className="text-base font-semibold text-gray-950">Store</div>
				<div className="text-base font-semibold text-gray-950">Price</div>
				<div className="text-base font-semibold text-gray-950">Notes</div>
				{recipient.items.map(gift => (
					<React.Fragment key={gift.id}>
						<div className=" p-3 rounded flex items-center gap-2" onClick={() => handleItemClick(gift.id)}>
							{gift.status === 'complete' ? <SquareCheckBig /> : <Square />}
							{gift.name}
						</div>
						<div className=" p-3 rounded">{gift.where_to_buy}</div>
						<div className=" p-3 rounded">
							${parseInt(gift.cost).toFixed(2)}
						</div>
						<div className=" p-3 rounded">{gift.notes}</div>
					</React.Fragment>
				))}
			</div>

			{/* Mobile Card View */}
			<div className="md:hidden space-y-4">
				{recipient.items.map(gift => (
					<div
						key={gift.id}
						className=" p-4 rounded-lg shadow-sm"
					>
						<div className="flex justify-between items-center mb-2">
							<div className="font-medium flex items-center gap-2" onClick={() => handleItemClick(gift.id)}>
								{gift.status === 'complete' ? <SquareCheckBig /> : <Square />}
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
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2 justify-end cursor-pointer" onClick={() => setIsModalOpen(true)}>
						<span>Add more item</span>
						<CirclePlus color="#5B4B8A" size={24} />
					</div>
					<div
						className="flex items-center gap-2 justify-end cursor-pointer"
						onClick={handleDeleteRecipient}
					>
						<span>Remove recipient</span>
						<Trash2 color="#5B4B8A" size={24} />
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

export default ListItem;
