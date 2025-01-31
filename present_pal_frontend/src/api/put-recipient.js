async function putRecipient(recipientId, data) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("You must be logged in to update a recipient");
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recipients/${recipientId}/`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to update recipient");
    }

    return await response.json();
}

export default putRecipient;
