import {User} from "../interfaces/interfaces";
import pureJwt from 'react-native-pure-jwt'

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const jwt_key = process.env.JWT_SECRET as string

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
    const oneYearInSeconds = 60 * 60 * 24 * 365; // 31,536,000 segundos
    const payload = {
        email, // dados que você quer assinar
        exp: Math.floor(Date.now() / 1000) + oneYearInSeconds // tempo de expiração do token em segundos
    };
    return pureJwt.sign(
        payload,
        jwt_key, // chave secreta para assinar o token
        {
            alg: 'HS256' // algoritmo para assinar o token, não alterar
        }
    )
}

