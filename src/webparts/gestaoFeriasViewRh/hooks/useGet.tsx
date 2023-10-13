import * as React from 'react';
import { useFetch } from './useFetch';

export function useGet<T>(route: string): T[] {
    const [data, setData] = React.useState<T[]>([]);

    const response = useFetch<T>(route, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    React.useEffect(() => {
        setData(response.data);
    }, [response]);

    return data;
}