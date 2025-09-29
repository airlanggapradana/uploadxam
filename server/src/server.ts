import express, {Application} from 'express';
import cors from 'cors';
import {errorHandler} from "./middlewares/errorHandler";
import userRouter from "./controllers/users.controller";
import {env} from "./env";
import authRouter from "./controllers/auth.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});