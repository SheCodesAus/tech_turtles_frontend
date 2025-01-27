async function getUser(userID) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userID}`;
    const response = await fetch(url, { method: "GET"});
    
    if (!response.ok) {
        const fallbackError = `Error fetching user details with id ${userID}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getUser;