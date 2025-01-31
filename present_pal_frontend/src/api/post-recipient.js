async function postRecipient(data) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("You must be logged in to create a list");
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recipients/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to create list");
    }

    return await response.json();
}

export default postRecipient;
