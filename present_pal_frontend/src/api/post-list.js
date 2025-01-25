async function postList(listData) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("You must be logged in to create a list");
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/lists/`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(listData),
        }
    );

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to create list");
    }

    return await response.json();
}

export default postList;