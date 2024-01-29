'use client';
import {useRouter} from "next/navigation";


export default function Home({}) {
    const router = useRouter();
    return (
        <>
            <h1>HOME</h1>
            <button type='button' onClick={() => router.push('/auth/signIn')}>로그인</button>
        </>
    )
        ;
}
