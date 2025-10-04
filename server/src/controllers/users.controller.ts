import {Router} from 'express';
import {
  deleteSingleUpload,
  deleteUser,
  getAllUploads,
  getUserUploads,
  makeUpload,
  updateUpload,
  updateUser
} from "../services/users.service";

const userRouter = Router();

userRouter.get('/uploads', getAllUploads)
userRouter.put('/uploads/:id', updateUpload)
userRouter.delete('/uploads/:id', deleteSingleUpload)
userRouter.put('/:id', updateUser)
userRouter.get('/:userId/uploads', getUserUploads)
userRouter.delete('/:id', deleteUser)
userRouter.post('/upload', makeUpload)

export default userRouter;