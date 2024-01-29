'use client';

import NextAuthProvider from "@/provider/NextAuthProvider";
import ReduxProvider from "@/redux/provider";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <ReduxProvider>
            <NextAuthProvider>
                <div>Home</div>
                <button type='button' onClick={() => router.push('/auth/signIn')}>로그인</button>
            </NextAuthProvider>
        </ReduxProvider>
    );
}
