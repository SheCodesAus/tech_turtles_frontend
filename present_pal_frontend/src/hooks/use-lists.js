import { useState, useEffect } from "react";
import getLists from "../api/get-lists";

export default function useLists() {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        async function fetchLists() {
            try {
                setLoading(true);
                const listsData = await getLists();
                setLists(listsData);
            } catch (err) {
                setError(err.message || "An error occurred while fetching lists.");
            } finally {
                setLoading(false);
            }
        }

        fetchLists();
    }, []);

    return { lists, loading, error };
}