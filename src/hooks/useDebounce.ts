'use client';

import {useEffect, useState} from "react";

export default function useDebounce(value:string ,delay: number) {
    const [debounceValue, setDebounceValue] = useState<string>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(timer);
        }
    }, [value]);

    return {debounceValue};
}