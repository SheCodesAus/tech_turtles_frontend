async function getLists() {
	const url = `${import.meta.env.VITE_API_URL}/lists`;
	const token = localStorage.getItem("token");
	const response = await fetch(url, {
		method: "GET",
		headers: {
			'Authorization': `Token ${token}`,
		},
	});

	if (!response.ok) {
		const fallbackError = "Error fetching lists";

		const data = await response.json().catch(() => {
			throw new Error(fallbackError);
		});

		const errorMessage = data?.detail ?? fallbackError;
		throw new Error(errorMessage);
	}

	return await response.json();
}

export default getLists;
