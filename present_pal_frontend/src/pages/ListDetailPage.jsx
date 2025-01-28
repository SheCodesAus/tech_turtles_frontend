import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem.jsx';

const info1 = {
	"id": 1,
	"owner": 3,
	"recipients": [
		{
			"id": 1,
			"name": "Kirby",
			"is_open": true,
			"date_created": "2025-01-25T00:55:33.684317Z",
			"unique_code": "01aca73f-c769-49f4-8dfe-2edd64f4a124",
			"list": 1
		}
	],
	"name": "Xmas List Work",
	"description": "List for co-workers and secret santa options",
	"budget": 100,
	"is_open": true,
	"date_created": "2025-01-25T00:52:22.311075Z"
};

const ListDetailPage = () => {
	const { listId } = useParams();
	const [listInfo, setListInfo] = useState(info1);

	return (
		<div className="contents-column">
			<div className="list-detail-title-container">
				<h1 className="body-copy-title">{listInfo.name}</h1>
				<h1 className="body-copy-title">{`Budget Summary: $${parseFloat(listInfo.budget).toFixed(2)}`}</h1>
			</div>

			<div>
				{listInfo.recipients.map(recipient => {
					return (
						// <ListItem />
					)
				})}
			</div>
		</div>
	)
}

export default ListDetailPage
