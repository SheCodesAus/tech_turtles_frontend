async function deleteRecipient(recipientId) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("You must be logged in to delete a recipient");
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recipients/${recipientId}/`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        }
    );

    if (!response.ok) {
        try {
            const data = await response.json();
            throw new Error(data.detail || "Failed to delete recipient");
        } catch (error) {
            throw new Error("Failed to delete recipient: " + response.statusText);
        }
    }

    return { success: true };
}

export default deleteRecipient;
