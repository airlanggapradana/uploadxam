import { Router } from "express";
import { getUserRating, upsertRating } from "../services/rating.service";

const ratingRouter = Router();

// POST /api/ratings — buat atau update rating
ratingRouter.post("/", upsertRating);

// GET /api/ratings/:uploadId?userId=... — ambil rating user tertentu pada satu soal
ratingRouter.get("/:uploadId", getUserRating);

export default ratingRouter;
