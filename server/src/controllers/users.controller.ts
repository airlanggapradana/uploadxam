import { Router } from "express";
import {
  deleteSingleUpload,
  deleteUser,
  getAllUploads,
  getRecentUploads,
  getUserStats,
  getUserUploads,
  incrementDownload,
  incrementView,
  makeUpload,
  updateUpload,
  updateUser,
} from "../services/users.service";

const userRouter = Router();

userRouter.get("/uploads", getAllUploads);
userRouter.get("/uploads/recent", getRecentUploads);
userRouter.get("/stats", getUserStats);
userRouter.patch("/uploads/:id/view", incrementView);
userRouter.patch("/uploads/:id/download", incrementDownload);
userRouter.put("/uploads/:id", updateUpload);
userRouter.delete("/uploads/:id", deleteSingleUpload);
userRouter.put("/:id", updateUser);
userRouter.get("/:userId/uploads", getUserUploads);
userRouter.delete("/:id", deleteUser);
userRouter.post("/upload", makeUpload);

export default userRouter;