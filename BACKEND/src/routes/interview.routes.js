import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {
  generateInterViewReportController,
  generateResumePdfController,
  getAllInterviewReportsController,
  getInterviewReportByIdController,
} from "../controllers/interview.controller.js";
import upload from "../middleware/file.middleware.js";

const interviewRouter = express.Router();

interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterViewReportController,
);

interviewRouter.get(
  "/report/:interviewId",
  authUser,
  getInterviewReportByIdController,
);

interviewRouter.get("/", authUser, getAllInterviewReportsController);

interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authUser,
  generateResumePdfController,
);

export default interviewRouter;
