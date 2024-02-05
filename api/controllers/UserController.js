import {User} from "../models/Models.js";
import bcrypt from 'bcrypt';
import utils from "../utils/utils.js";

export default {
    async createUserAccount(req, res){
        try{
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
        }catch (e) {
            console.log("Erro ao criar usuario: ", e)
            return res.status(500).json({message: 'Erro ao criar conta'})
        }
    }
}