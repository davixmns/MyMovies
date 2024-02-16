import {User} from "../models/Models.js";
import bcrypt from 'bcrypt';
import utils, {emailRegex} from "../utils/utils.js";

export default {
    async createUserAccount(req, res) {
        try {
            const {name, email, password} = req.body.user;
            const verifyUserResponse = utils.verifyUserForm({name, email, password});
            if (verifyUserResponse !== true) return res.status(400).json({message: verifyUserResponse});
            const userExists = await User.findOne({where: {email}});
            if (userExists) return res.status(409).json({message: 'Email já cadastrado'});
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({name, email, password: hashedPassword});
            const user_jwt = utils.signJWT({user_id: newUser.user_id});
            const userDTO = {
                user_id: newUser.user_id,
                name: newUser.name,
                email: newUser.email
            }
            return res.status(201).json({user_jwt: user_jwt, user: userDTO, message: 'Conta criada com sucesso'});
        } catch (e) {
            console.log("Erro ao criar usuario: ", e)
            return res.status(500).json({message: 'Erro ao criar conta'})
        }
    },

    async updateUserAccount(req, res) {
        try {
            const {name, email, profile_picture} = req.body.user;
            const userId = req.user_id;
            if (!name || !email) return 'preencha todos os campos'
            if (!emailRegex.test(email)) return 'email inválido'
            const userExists = await User.findByPk(userId);
            if (!userExists) return res.status(404).json({message: 'Usuário não encontrado'});

            if(email !== userExists.email){
                const emailExists = await User.findOne({where: {email}});
                if (emailExists) return res.status(409).json({message: 'Email já cadastrado'});
            }
            await User.update({name, email, profile_picture}, {where: {user_id: userId}});
            return res.status(200).json({message: 'Conta atualizada com sucesso'});
        } catch (e) {
            console.log("Erro ao atualizar usuario: ", e)
            return res.status(500).json({message: 'Erro ao atualizar conta'})
        }
    }
}