async function postLogin(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
			username: username,
            password: password,
        }),
    });

    if (!response.ok) {
        const data = await response.json();
        const message = data.detail || "Registration failed";
        throw new Error(message);
    }

    return response.json();
}

export default postLogin; 
