import { useParams } from 'react-router-dom';
import useRecipient from '../hooks/use-share-items.js';
import SharedItem from '../components/SharedItem.jsx';

const SharedDetailPage = () => {
	const { uuid } = useParams();
	const { recipient, loading, error, refreshList } = useRecipient(uuid);

	return (
		<div className="contents-column">
			{loading && <p className="loading-message">Loading the contents of your list...</p>}
			{error && <p className="error-message">Failed to load lists. Please try again later.</p>}
			{!error && !loading &&
				<SharedItem recipient={recipient} refreshList={refreshList} uuid={uuid}/>
			}
		</div>
	)
}

export default SharedDetailPage;
