async function deleteList(listId) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("You must be logged in to delete the list");
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${listId}/`,
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
            throw new Error(data.detail || "Failed to delete list");
        } catch (error) {
            throw new Error("Failed to delete list: " + response.statusText);
        }
    }

    return { success: true };
}

export default deleteList;
