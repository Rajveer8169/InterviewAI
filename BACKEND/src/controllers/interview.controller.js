import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

export const generateInterViewReportController = async (req, res) => {
  const parser = new PDFParse({
    data: Uint8Array.from(req.file.buffer),
  });

  const resumeContent = await parser.getText();

  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(200).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
};

export const getInterviewReportByIdController = async (req, res) => {
  const { interviewId } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(400).json({
      message: "Interview report not found.",
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReport,
  });
};

export const getAllInterviewReportsController = async (req, res) => {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -updatedAt -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

    res.status(200).json({
        message:"Interview Reports fetched successfully",
        interviewReports
    })
};
