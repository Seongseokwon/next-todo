'use client';

import Image from "next/image";
import styles from "./page.module.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import ReduxProvider from "@/redux/provider";

export default function Home() {
    return (
        <ReduxProvider>
            <NextAuthProvider>
                <div>Home</div>
            </NextAuthProvider>
        </ReduxProvider>
    );
}
