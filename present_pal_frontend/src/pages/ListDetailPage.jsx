import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem.jsx';
import useList from '../hooks/use-list.js';
import { useState, useEffect } from 'react';

const ListDetailPage = () => {
	const { listId } = useParams();
	const { list, isLoading, error, refetchList } = useList(listId);
	const [recipients, setRecipients] = useState([]);

	// Fetch recipients when list loads
	useEffect(() => {
		const fetchRecipients = async () => {
			try {
				const response = await fetch(`/api/recipients/?list=${listId}`, {
					headers: {
						'Authorization': `Token ${localStorage.getItem('token')}`
					}
				});
				const data = await response.json();
				setRecipients(data);
			} catch (err) {
				console.error('Failed to fetch recipients:', err);
			}
		};

		if (list) {
			fetchRecipients();
		}
	}, [list, listId]);

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

					<div className="space-y-6">
						{recipients.map((recipient) => (
							<div key={recipient.id} className="bg-gray-200 rounded-lg p-6">
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-xl font-semibold">{recipient.name}</h2>
									<div className="flex items-center">
										<label className="relative inline-flex items-center cursor-pointer">
											<input type="checkbox" className="sr-only peer" checked={recipient.is_open} readOnly />
											<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
										</label>
									</div>
								</div>

								<table className="w-full">
									<thead>
										<tr className="text-left">
											<th className="w-1/12"></th>
											<th className="w-3/12">Product name</th>
											<th className="w-3/12">Store</th>
											<th className="w-2/12">Price</th>
											<th className="w-2/12">Notes</th>
											<th className="w-1/12"></th>
										</tr>
									</thead>
									<tbody>
										{recipient.items?.map((item) => (
											<tr key={item.id}>
												<td>
													<input type="checkbox" checked={item.status === 'PURCHASED'} readOnly />
												</td>
												<td>{item.name}</td>
												<td>{item.where_to_buy}</td>
												<td>${parseFloat(item.cost).toFixed(2)}</td>
												<td>{item.notes}</td>
												<td>
													<button className="text-gray-500 hover:text-gray-700">
														<i className="fas fa-trash"></i>
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						))}
					</div>
				</>
			}
		</div>
	)
}

export default ListDetailPage;