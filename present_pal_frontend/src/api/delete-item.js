async function deleteItem(itemId) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("You must be logged in to delete items");
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/${itemId}/`,
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
            throw new Error(data.detail || "Failed to delete item");
        } catch (error) {
            throw new Error("Failed to delete item: " + response.statusText);
        }
    }

    return { success: true };
}

export default deleteItem;
