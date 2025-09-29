import {Router} from 'express';
import {createUser, login} from "../services/auth.service";

const authRouter = Router();

authRouter.post('/login', login)
authRouter.post('/register', createUser)

export default authRouter;