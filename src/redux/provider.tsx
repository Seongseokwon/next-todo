'use client';

import {ReactNode, useRef} from "react";
import {AppStore, makeStore} from "@/redux/store";
import {Provider} from "react-redux";

export default function ReduxProvider({children}: { children: ReactNode }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}