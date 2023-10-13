import * as React from 'react';

export function useFetch<T>(route: string, init?: RequestInit): { data : T[] } {
    const [data, setData] = React.useState<T[]>([]);

    const apiURL = `https://cjinter.sharepoint.com/sites/newportal/_api/web/${route}`;

    React.useEffect(() => {
        fetch(apiURL, init)
            .then(response => response.json())
            .then(json => setData(json.value))
            .catch(error => console.log(error));
    }, [apiURL]);

    return {
        data
    };
}