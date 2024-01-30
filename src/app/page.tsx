'use client';
import {useRouter} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";


export default function Home({}) {
    const router = useRouter();
    const {data: session} = useSession();

    useEffect(() => {
        if(session?.user.accessToken) {
            router.push('/todo');
        }
    },[session?.user.accessToken])

    return (
        <>
            <h1>HOME</h1>
            <button type='button' onClick={() => router.push('/auth/signIn')}>로그인</button>
            <button type='button' onClick={() => signOut()}> 로그아웃</button>
        </>
    )
        ;
}
