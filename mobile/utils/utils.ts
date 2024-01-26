import {User} from "../interfaces/interfaces";
import {sign} from 'react-native-pure-jwt'

export const jwt_key = ''

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

export function verifyRegisterForm(name: string, email: string, password: string, confirmPassword: string) {
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        return "Preencha todos os campos"
    }
    if (!emailRegex.test(email)) {
        return "Email inválido"
    }
    if (password !== confirmPassword) {
        return "As senhas não coincidem"
    }
    if (password.length < 6) {
        return "A senha deve ter no mínimo 6 caracteres"
    }
    return true
}

export async function signJWT(email: string) {
    const oneYearInSeconds = 60 * 60 * 24 * 365; // 31,536,000 segundos
    const expirationTime = Math.floor(Date.now() / 1000) + oneYearInSeconds;

    const token = await sign(
        {
            exp: expirationTime,
            email: email
        },
        jwt_key,
        {
            alg: 'HS256'
        }
    )

    return token
}

