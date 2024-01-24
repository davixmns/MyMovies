import {User} from "../interfaces/interfaces";
import * as jose from 'jose'

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const jwt_key = process.env.JWT_SECRET

export function verifyIfUserIsFormatted(user: User) {
    if (user.name === '' || user.email === '' || user.password === '') {
        return "Preencha todos os campos";
    }
    if (!emailRegex.test(user.email)) {
        return "E-mail inválido";
    }
    if (user.password.length < 6) {
        return "A senha deve ter no mínimo 6 caracteres";
    }
    return true;
}

export function verifyLoginForm(email: string, password: string) {
    if (email === '' || password === '') {
        return "Preencha todos os campos"
    }
    if (!emailRegex.test(email)) {
        return "Email inválido"
    }
    return true
}

export async function signJWT(email: string) {
    return await new jose.SignJWT({email: email})
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("1y")
        .sign(new TextEncoder().encode(jwt_key));
}
