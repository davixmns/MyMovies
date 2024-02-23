import {User} from "../models/Models.js";
import bcrypt from 'bcrypt';
import utils, {emailRegex} from "../utils/utils.js";
import multer from 'multer';
import upload from "../multer.js";

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
            const {name, email} = req.body.user
            const userId = req.user_id;
            const userExists = await User.findByPk(userId);
            if (!userExists) return res.status(404).json({message: 'Usuário não encontrado'});
            if(email !== userExists.email){
                const emailExists = await User.findOne({where: {email}});
                if (emailExists) return res.status(409).json({message: 'Email já cadastrado'});
            }
            await userExists.update({name, email});
            const userDTO = {
                user_id: userExists.user_id,
                name: userExists.name,
                email: userExists.email,
            }
            return res.status(200).json({message: 'Conta atualizada com sucesso', user: userDTO});
        } catch (e) {
            console.log("Erro ao atualizar usuario: ", e)
            return res.status(500).json({message: 'Erro ao atualizar conta'})
        }
    },

    async uploadProfilePicture(req, res) {
        try {
            const filePath = req.file.path;
            await User.update({profile_picture: filePath}, {where: {user_id: req.user_id}});
            return res.status(200).json({message: 'Foto de perfil atualizada com sucesso', profile_picture: filePath});
        } catch (e) {
            console.log("Erro ao atualizar foto de perfil: ", e)
            return res.status(500).json({message: 'Erro ao atualizar foto de perfil'})
        }
    },

    async getProfilePicture(req, res) {
        try {
            const user = await User.findByPk(req.user_id);
            if (!user) return res.status(404).json({message: 'Usuário não encontrado'});
            const filePath = user.profile_picture;
            return res.sendFile(filePath);
        } catch (e) {
            console.log("Erro ao atualizar foto de perfil: ", e)
            return res.status(500).json({message: 'Erro ao atualizar foto de perfil'})
        }
    }
}