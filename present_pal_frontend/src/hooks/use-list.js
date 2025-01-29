import { useState, useEffect } from "react";
import getList from "../api/get-list";

export default function useList(id) {
    const [list, setList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getList(id);
            setList(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
    }, [id]);

    return { list, isLoading, error, refetchList: fetchList };
}
