import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import {emailRegex} from "../utils/utils.js";
import {User} from "../models/Models.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export default {
    async verifyUserJWT(req, res, next) {
        try {
            const token = req.headers['authorization']?.split(' ')[1]
            if (!token) return res.status(401).json({message: 'Token não informado'})
            const decoded = jwt.verify(token, JWT_SECRET)
            if (!decoded) return res.status(401).json({message: 'Token inválido'})
            req.user_id = decoded.user_id
            next()
        } catch (e) {
            return res.status(500).json({message: 'Erro ao verificar token'})
        }
    },

    async verifyUserUpdateForm(req, res, next) {
        const {name, email} = req.body.user;
        if (!name || !email) return res.status(400).json({message: 'Preencha todos os campos'});
        if (!emailRegex.test(email)) return res.status(400).json({message: 'Email inválido'});
        next()
    }
}