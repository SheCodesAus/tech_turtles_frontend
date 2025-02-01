async function postShareRecipient(uuid, data) {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recipients/${uuid}/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to update items");
    }

    return await response.json();
}

export default postShareRecipient;
