async function postSignup(username, email, password) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
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

export default postSignup; 
