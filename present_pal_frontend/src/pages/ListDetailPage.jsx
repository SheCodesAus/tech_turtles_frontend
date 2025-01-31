import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem.jsx';
import useList from '../hooks/use-list.js';
import postRecipient from '../api/post-recipient.js';
import Button from '../components/Button.jsx';
import { useState } from 'react';
import Modal from '../components/Modal';

const ListDetailPage = () => {
	const { listId } = useParams();
	const { list, isLoading, error, refetchList } = useList(listId);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [recipientData, setRecipientData] = useState({
		name: '',
		list: parseInt(listId)
	});


	const handleSave = async () => {
		try {
			await postRecipient(recipientData);
			await refetchList();
			setRecipientData({
				name: '',
				list: parseInt(listId)
			});
		} catch (error) {
			console.error('Failed to save recipient:', error);
		}
	};

	const handleInputChange = (e) => {
		setRecipientData({
			...recipientData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="contents-column">
			{isLoading && <p className="loading-message">Loading the contents of your list...</p>}
			{error && <p className="error-message">Failed to load lists. Please try again later.</p>}
			{!error && !isLoading &&
				<>
					<div className="flex flex-col items-start md:items-center md:flex-row justify-evenly md:justify-between mb-8">
						<h1 className="text-2xl md:text-3xl font-bold">{list.name}</h1>
						<h1 className="text-2xl md:text-3xl font-bold">{`Budget Summary: $${parseFloat(list.budget).toFixed(2)}`}</h1>
					</div>
					{list.recipients.length > 0 && list.recipients.map(recipient => {
						return <ListItem recipient={recipient} key={recipient.id} onSave={refetchList} />
					})}
					{list.recipients.length === 0 && <div className="flex flex-row items-center justify-center">
						<h3 className="text-lg font-semibold text-gray-950">You currently do not have any recipient.</h3>
					</div>}
				</>
			}
			<div className="pt-4 pb-4 flex flex-row justify-end items-center">
				<Button
					size='small'
					variant='secondary'
					onClick={() => setIsModalOpen(true)}
				>
					NEW RECIPIENT
				</Button>

				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSave={handleSave}
				>
					<input
						type="text"
						name="name"
						placeholder="Recipient Name"
						className="p-2 border-gray-500 border rounded"
						value={recipientData.name}
						onChange={handleInputChange}
					/>
				</Modal>
			</div>

		</div>
	)
}

export default ListDetailPage;
