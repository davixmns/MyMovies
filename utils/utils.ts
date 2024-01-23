import {User} from "../interfaces/interfaces";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function verifyIfUserIsFormatted(user: User) {
    if (user.name === "" || user.email === "" || user.password === "") {
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