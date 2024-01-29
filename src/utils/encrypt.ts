import * as bcrypt from 'bcrypt';

export async function encryption(pw: string) {
    return await bcrypt.hash(pw + process.env.NEXT_PUBLIC_ENCRYPT_SALT, 8);
}

export async function checkHash(pw: string, hashedPw: string) {
    return await bcrypt.compare(pw + process.env.NEXT_PUBLIC_ENCRYPT_SALT, hashedPw);
}