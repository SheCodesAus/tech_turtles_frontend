import ListCard from '../components/ListCard'
import useLists from '../hooks/use-lists';

const ListsListingPage = () => {
	const { lists, loading, error, refreshList } = useLists();

	return (
		<div className="contents-column">
			<h1 className="listing-title">My Lists</h1>
			<div className="listing-lists-container">
				{loading && <p className="loading-message">Loading lists...</p>}
				{error && <p className="error-message">Failed to load lists. Please try again later.</p>}
				{lists.length === 0 && <p className="text-sm text-gray-600 mb-3">You currently do not have any gift list.</p>}
				{!loading && !error && lists.map((listData) => {
					return (
							<ListCard listData={listData} key={listData.id} refreshList={refreshList} />
					)
				})}
			</div>

		</div>
	)
}

export default ListsListingPage
