import ListCard from '../components/ListCard'
import useLists from '../hooks/use-lists';

const ListsListingPage = () => {
	const { lists, loading, error } = useLists();
	const userId = localStorage.getItem("userId");
	const currentLists = lists.filter(list => list.owner === parseInt(userId));

	if (loading) {
		return <p className="text-sm text-gray-600 mb-3">Loading...</p>;
	}

	if (error) {
		return <p className="text-sm text-gray-600 mb-3">{error.message}</p>;
	}
	return (
		<div className="contents-column">
			<h1 className="listing-title">My Lists</h1>
			<div className="listing-lists-container">
				{loading && <p className="loading-message">Loading lists...</p>}
				{error && <p className="error-message">Failed to load lists. Please try again later.</p>}
				{currentLists.length === 0 && <p className="text-sm text-gray-600 mb-3">You currently do not have any gift list.</p>}
				{!loading && !error && currentLists.map((listData) => {
					return <ListCard key={listData.id} listData={listData} />;
				})}
			</div>
		</div>
	)
}

export default ListsListingPage
