import jwt, {JwtPayload} from "jsonwebtoken";

interface SignOption {
    expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: '3h'
}
const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
    return jwt.sign(payload, secretKey!, options);
}

export function verifyJwt(token: string) {
    try {
        return jwt.verify(token, secretKey!) as JwtPayload;
    } catch (e) {
        console.error(e);
        return null;
    }


}

