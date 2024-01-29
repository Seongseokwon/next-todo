'use client';
import {ChangeEvent, FormEvent, useState} from "react";
import {useInput} from "@/hooks/useInput";
import {emailValidator, passwordValidator} from "@/utils/validator";

export default function SignupPage() {
    const signupInfoInputs = useInput(
        {
            email: '',
            nickname: '',
            password: '',
            passwordConfirm: ''
        })
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        signupInfoInputs.onChange(e);
        const {target: {name, value}} = e
        const {value :{email, nickname, password, passwordConfirm}} = signupInfoInputs;

        if (name === 'email') {
            if (!emailValidator(value)) {
                setError('이메일 형식이 올바르지 않습니다');
            } else {
                setError('');
            }
        }

        if (name === 'nickname') {
            if (value.trim().length === 0 || value.trim().length < 2) {
                setError('닉네임은 2글자 이상이어야 합니다.');
            } else {
                setError('')
            }
        }

        if (name === 'password') {
            if (!passwordValidator(value)) {
                setError('비밀번호 형식이 올바르지 않습니다.');
            } else if (passwordConfirm.length > 0 && value !== passwordConfirm) {
                setError('비밀번호와 비밀번호 확인 값이 다릅니다.');
            } else {
                setError('')
            }
        }

        if (name === 'passwordConfirm') {
            if (!passwordValidator(value)) {
                setError('비밀번호 형식이 올바르지 않습니다.');
            } else if (value !== password) {
                setError('비밀번호와 비밀번호 확인 값이 다릅니다.');
            } else {
                setError('')
            }
        }
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (error.length > 0) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfoInputs.value)
        })
        if (!res.ok) return;
        console.log('SIGNUP SUCCESS');
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='email' value={signupInfoInputs.value.email} onChange={handleInputChange}/>
            <input type="text" name='nickname' value={signupInfoInputs.value.nickname}
                   onChange={handleInputChange}/>
            <input type="password" name='password' value={signupInfoInputs.value.password}
                   onChange={handleInputChange}/>
            <input type="password" name='passwordConfirm' value={signupInfoInputs.value.passwordConfirm}
                   onChange={handleInputChange}/>
            <p>{error.length > 0 ? error : ''}</p>
            <button type='submit'>회원가입</button>
        </form>
    </div>
}