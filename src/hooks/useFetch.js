import { useState, useEffect, useCallback } from 'react';

const useFetch = (fetchFunction, ...args) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Usiamo useCallback per memorizzare fetchData e prevenire loop infiniti in useEffect
    const fetchData = useCallback(() => {
        setLoading(true);
        setError(null);
        fetchFunction(...args)
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                console.error('Errore durante il recupero dei dati:', err);
                setError('Impossibile caricare i dati. Riprova più tardi.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [fetchFunction, ...args]); // Dipendenze per useCallback

    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData è stabile grazie a useCallback

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
