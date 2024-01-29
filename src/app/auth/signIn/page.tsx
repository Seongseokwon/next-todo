'use client';

import {ChangeEvent, FormEvent, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e

        setLoginInfo((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(loginInfo);

        try {
            const res = await signIn("credentials", {
                email: loginInfo.email,
                password: loginInfo.password,
                redirect: true,
                callbackUrl: '/todo'
            })
        } catch (e) {
            console.log(e);
        }
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='email' value={loginInfo.email} onChange={handleInputChange}/>
            <input type="password" name='password' value={loginInfo.password} onChange={handleInputChange}/>
            <button type='button' onClick={() => router.push('/auth/signup')}>회원가입</button>
            <button type="submit">로그인</button>
        </form>
    </div>
}