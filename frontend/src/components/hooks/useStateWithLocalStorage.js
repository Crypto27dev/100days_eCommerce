import { useState, useEffect } from 'react'

const useStateWithLocalStorage = localStorageKey => {

    const [data, setData] = useState(
        window.localStorage.getItem(localStorageKey) || ''
    );

    useEffect(() => {

        window.localStorage.setItem(localStorageKey, data);

    }, [data, localStorageKey]);

    return [data, setData];
}

export default useStateWithLocalStorage;
