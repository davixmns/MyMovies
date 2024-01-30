import dotenv from "dotenv";
import jwt from 'jsonwebtoken'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export default {
    async verifyUserJWT(req, res, next) {
        try {
            const token = req.headers['authorization']?.split(' ')[1]
            console.log("TOKEN ", token)
            if (!token) return res.status(401).json({message: 'Token não informado'})
            const decoded = jwt.verify(token, JWT_SECRET)
            if (!decoded) return res.status(401).json({message: 'Token inválido'})
            req.user_id = decoded.user_id
            next()
        } catch (e) {
            console.log("ERRO AO VERIFICAR TOKEN ", e)
            return res.status(500).json({message: 'Erro ao verificar token'})
        }
    }
}