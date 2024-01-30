import {Router} from 'express';

const router = Router();

import middleware from '../middlewares/middleware.js';

import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";

router.post('/login', AuthController.login)
router.post('/user', UserController.createUserAccount)
router.post('/verify-jwt', middleware.verifyUserJWT, AuthController.confirmJWT)

export default router;