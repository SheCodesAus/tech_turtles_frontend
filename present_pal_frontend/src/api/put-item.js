async function putItem(itemId, data) {
	const url = `${import.meta.env.VITE_API_URL}/items/${itemId}/`;
	const token = localStorage.getItem("token");
	const response = await fetch(url, {
		method: "PUT",
		headers: {
			'Authorization': `Token ${token}`,
			'Content-Type': 'application/json',
		},
        body: JSON.stringify(data),
	});

	if (!response.ok) {
		const fallbackError = `Error updating item with id ${itemId}`;

		const data = await response.json().catch(() => {
			throw new Error(fallbackError);
		});

		const errorMessage = data?.detail ?? fallbackError;
		throw new Error(errorMessage);
	}

	return await response.json();
}

export default putItem;
