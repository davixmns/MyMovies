import jwt from 'jsonwebtoken';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
    verifyUserForm(user) {
        if (!user.name || !user.email || !user.password) {
            return 'preencha todos os campos'
        }
        if (!emailRegex.test(user.email)) {
            return 'email inválido'
        }
        if (user.password.length < 8) {
            return 'senha deve ter no mínimo 8 caracteres'
        }
        return true;
    },

    signJWT(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1y' });
    }
}