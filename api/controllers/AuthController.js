import User from "../models/User.js";
import bcrypt from "bcrypt";
import utils from "../utils/utils.js";

export default {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            if (!email || !password) return res.status(400).send('Email and password are required');
            const userExists = await User.findOne({where: {email}});
            if (!userExists) return res.status(404).json({message: 'User not found'});
            const passwordMatch = await bcrypt.compare(password, userExists.password);
            if (!passwordMatch) return res.status(401).json({message: 'Invalid password'});
            const user_jwt = utils.signJWT({user_id: userExists.user_id});
            return res.status(200).json({user_jwt: user_jwt, message: 'Login successful'});
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Error logging in'})
        }
    },

    async confirmJWT(req, res) {
        const userId = req.user_id;
        const user = await User.findByPk(userId);
        return res.status(200).json({user: user});
    }
}