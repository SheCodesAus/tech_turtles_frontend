import { useState } from 'react'
import ListCard from '../components/ListCard'

// Might want to save user name to local storage once logged in;
const userName = localStorage.getItem('fullName') || '';
const info1 = [
	{
		"id": 2,
		"owner": 2,
		"name": "Secret Santa",
		"description": "What to buy for all my secret santas",
		"budget": 50,
		"is_open": true,
		"date_created": "2025-01-25T00:53:24.363823Z"
	},
	{
		"id": 3,
		"owner": 2,
		"name": "Family Christmas List",
		"description": "Even non blood relatives",
		"budget": 200,
		"is_open": true,
		"date_created": "2025-01-25T00:58:47.503775Z"
	},
	{
		"id": 4,
		"owner": 2,
		"name": "Delete me",
		"description": "Please work",
		"budget": 500,
		"is_open": true,
		"date_created": "2025-01-25T01:59:24.803352Z"
	}
]

const ListsListingPage = () => {
	// Will need to use a useEffect hook to setList when api is built
	const [lists, setLists] = useState(info1.filter(list => list.is_open === true));

	return (
		<div className="contents-column">
			<h1 className="listing-title">{`${userName}'s lists`}</h1>
			<div className="listing-lists-container">
				{lists.map(list => {
					return (
						<ListCard listData={list} />
					)
				})}
			</div>
		</div>
	)
}

export default ListsListingPage
