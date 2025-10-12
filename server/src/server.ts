import express, {Application} from 'express';
import cors from 'cors';
import {errorHandler} from "./middlewares/errorHandler";
import userRouter from "./controllers/users.controller";
import {env} from "./env";
import authRouter from "./controllers/auth.controller";
import {rateLimit} from 'express-rate-limit';

const app: Application = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});