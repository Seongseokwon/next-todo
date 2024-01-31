'use client';

import {ChangeEvent, useCallback, useState} from "react";

export const useInput = <T>(initialValue: T) => {
    const [value, setValue] = useState<T>(initialValue)

    const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        setValue((prev) => ({...prev, [name]: value}));
    },[])

    console.log('tset3');
    return {value, onChange: handleValueChange};
}