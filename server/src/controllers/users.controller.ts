import {Router} from 'express';
import {deleteUser, getAllUploads, makeUpload, updateUser} from "../services/users.service";

const userRouter = Router();

userRouter.get('/uploads', getAllUploads)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.post('/upload', makeUpload)

export default userRouter;