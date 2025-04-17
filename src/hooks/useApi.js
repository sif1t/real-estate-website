import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetchIndex, setRefetchIndex] = useState(0);

    const refetch = () => setRefetchIndex(prev => prev + 1);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios(url, {
                    ...options,
                    cancelToken: source.token
                });

                if (isMounted) {
                    setData(response.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted && !axios.isCancel(err)) {
                    setError(err);
                    setData(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            source.cancel('Component unmounted');
        };
    }, [url, refetchIndex, JSON.stringify(options)]);

    return { data, loading, error, refetch };
};

export default useApi;