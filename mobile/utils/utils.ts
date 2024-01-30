export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
    if (name === '' || email === '' || password === '') {
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

