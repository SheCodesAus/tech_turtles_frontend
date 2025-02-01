import { useState, useEffect } from "react";
import getRecipient from "../api/get-recipient.js";

export default function useRecipient(uuid) {
	const [recipient, setRecipient] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchRecipient = async () => {
		try {
			setLoading(true);
			const recipientData = await getRecipient(uuid);
			setRecipient(recipientData);
		} catch (err) {
			setError(err.message || "An error occurred while fetching items.");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchRecipient();
	}, []);

	return { recipient, loading, error, refreshList: fetchRecipient };
}
