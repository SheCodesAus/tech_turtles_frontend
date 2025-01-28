import ListCard from '../components/ListCard'
import useLists from '../hooks/use-lists';

const ListsListingPage = () => {
	const { lists, loading, error } = useLists();
	const userName = localStorage.getItem('fullName') || '';
	const currentLists = lists.filter(list => list.is_open === true);

	if (loading) {
        return <p className="text-sm text-gray-600 mb-3">Loading...</p>;
    }

    if (error) {
        return <p className="text-sm text-gray-600 mb-3">{error.message}</p>;
    }
	return (
		<div className="contents-column">
			<h1 className="listing-title">{`${userName}'s lists`}</h1>
			<div className="listing-lists-container">
				{loading && <p className="loading-message">Loading lists...</p>}
				{error && <p className="error-message">Failed to load lists. Please try again later.</p>}
				{!loading && !error && currentLists.map((listData, key) => {
					return <ListCard key={key} listData={listData} />;
				})}
				{/* {currentLists.map(list => {
					return (
						<ListCard key={list.id} listData={list} />
					)
				})} */}
			</div>
		</div>
	)
}

export default ListsListingPage
