import { Router } from "express";
import {
  createReport,
  getAdminReports,
  getAdminReportById,
  updateReportStatus,
  deleteReport,
} from "../services/report.service";

const reportRouter = Router();

// User-facing: submit a report
reportRouter.post("/", createReport);

// Admin-facing: manage reports
reportRouter.get("/admin", getAdminReports);
reportRouter.get("/admin/:id", getAdminReportById);
reportRouter.patch("/admin/:id", updateReportStatus);
reportRouter.delete("/admin/:id", deleteReport);

export default reportRouter;
