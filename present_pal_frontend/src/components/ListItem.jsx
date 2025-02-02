import ToggleSwitch from './ToggleSwitch';
import { Square, SquareCheckBig, Trash2, CirclePlus, Share2, Pencil } from 'lucide-react';
import './ListItem.css';
import React, { useState } from 'react';
import postItem from '../api/post-item.js'
import putItem from '../api/put-item.js'
import putRecipient from '../api/put-recipient.js';
import deleteRecipient from '../api/delete-recipient.js';
import deleteItem from '../api/delete-item.js';
import Modal from '../components/Modal.jsx';

const ListItem = (props) => {
	const [recipient, setRecipient] = useState(props.recipient);
	const [modalType, setModalType] = useState(null);
	const [editingItem, setEditingItem] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [itemData, setItemData] = useState({
		name: '',
		cost: 0,
		recipient: parseInt(recipient.id),
		where_to_buy: '',
		notes: ''
	});

	const isValidUrl = (string) => {
		try {
			const url = new URL(string);
			return url.protocol === 'http:' || url.protocol === 'https:';
		} catch {
			return false;
		}
	};

	const renderStore = (store) => {
		if (isValidUrl(store)) {
			return (
				<a
					href={store}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 hover:text-blue-800 hover:underline"
					onClick={(e) => e.stopPropagation()}
				>
					{store}
				</a>
			);
		}
		return store;
	};

	const handleItemClick = (itemId) => {
		try {
			const item = recipient.items.find(i => i.id === itemId);
			const newStatus = item.status === 'complete' ? 'incomplete' : 'complete';
			putItem(itemId, { status: newStatus });
			setRecipient(prev => ({
				...prev,
				items: prev.items.map(item =>
					item.id === itemId ? { ...item, status: newStatus } : item)
			}))
		} catch (error) {
			console.error('Error updating item status', error);
		}
	}

	const handleDeleteItem = async (itemId) => {
		try {
			await deleteItem(itemId);
			setRecipient(prev => ({
				...prev,
				items: prev.items.filter(item => item.id !== itemId)
			}));
		} catch (error) {
			console.error('Failed to delete item:', error);
		}
	};

	const handleEdit = async () => {
		try {
			await putItem(editingItem.id, itemData);
			setRecipient(prev => ({
				...prev,
				items: prev.items.map(item => 
					item.id === editingItem.id ? { ...item, ...itemData } : item
				)
			}));
			setIsModalOpen(false);
			setModalType(null);
			setEditingItem(null);
		} catch (error) {
			console.error('Failed to edit item:', error);
		}
	};

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
			setIsModalOpen(false);
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

	const handleShare = async () => {
		try {
			const sharedURL = `${window.location.origin}/recipients/${recipient.unique_code}`;
			navigator.clipboard.writeText(sharedURL);
			alert('Share link copied to clipboard!');
		} catch (error) {
			console.error('Failed to share list:', error);
			alert('Failed to share the list. Please try again.');
		}
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
			<div className="mt-4 hidden md:grid md:grid-cols-5 gap-4 mb-4">
				<div className="text-base font-semibold text-gray-950">Product name</div>
				<div className="text-base font-semibold text-gray-950">Store</div>
				<div className="text-base font-semibold text-gray-950">Price</div>
				<div className="text-base font-semibold text-gray-950">Notes</div>
				<div className="text-base font-semibold text-gray-950"></div>
				{recipient.items.map(gift => (
					<React.Fragment key={gift.id}>
						<div className="p-3 rounded flex items-center gap-2" onClick={() => handleItemClick(gift.id)}>
							{gift.status === 'complete' ? <SquareCheckBig /> : <Square />}
							{gift.name}
						</div>
						<div className="p-3 rounded">
							{renderStore(gift.where_to_buy)}
						</div>
						<div className="p-3 rounded">
							${parseInt(gift.cost).toFixed(2)}
						</div>
						<div className="p-3 rounded">
							<span>{gift.notes}</span>
						</div>
					<div className="flex justify-end items-center">
							<button
								onClick={(e) => {
									e.stopPropagation();
									setEditingItem(gift);
									setModalType('edit');
									setIsModalOpen(true);
									setItemData({
										name: gift.name,
										cost: gift.cost,
										recipient: parseInt(recipient.id),
										where_to_buy: gift.where_to_buy,
										notes: gift.notes
									});
								}}
								className="text-gray-600 hover:text-blue-600 hover:scale-125 transition-colors mr-8 p-1"
							>
								<Pencil size={18} />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleDeleteItem(gift.id);
								}}
								className="text-gray-600 hover:text-red-600 hover:scale-125 transition-colors ml-2 p-1"
							>
								<Trash2 size={18} />
							</button>
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
							<div className="font-medium flex items-center gap-2" onClick={() => handleItemClick(gift.id)}>
								{gift.status === 'complete' ? <SquareCheckBig /> : <Square />}
								{gift.name}
							</div>
							<div>
								<button
									onClick={(e) => {
										e.stopPropagation();
									}}
									className="text-gray-600 hover:text-blue-600 hover:scale-125 transition-colors mr-4"
								>
									<Pencil size={18} />
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteItem(gift.id);
									}}
									className="text-gray-600 hover:text-red-600 hover:scale-125 transition-colors"
								>
									<Trash2 size={18} />
								</button>
							</div>
						</div>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-950">Store:</span>
								<span>{renderStore(gift.where_to_buy)}</span>
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
					<div className="flex items-center gap-2 justify-end cursor-pointer" onClick={() => {
						setModalType('add');
						setIsModalOpen(true);
						setItemData({
							name: '',
							cost: 0,
							recipient: parseInt(recipient.id),
							where_to_buy: '',
							notes: ''
						});
					}}>
						<span>Add item</span>
						<CirclePlus color="#5B4B8A" size={24} />
					</div>
					<div
						className="flex items-center gap-2 justify-end cursor-pointer"
						onClick={handleDeleteRecipient}
					>
						<span>Remove recipient</span>
						<Trash2 color="#5B4B8A" size={24} />
					</div>
					<div
						className="flex items-center gap-2 justify-end cursor-pointer"
						onClick={handleShare}
					>
						<span>Share list</span>
						<Share2 color="#5B4B8A" size={24} />
					</div>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setModalType(null);
					setEditingItem(null);
				}}
				onSave={modalType === 'add' ? handleSave : handleEdit}
				title={modalType === 'add' ? 'Add New Item' : 'Edit Item'}
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
