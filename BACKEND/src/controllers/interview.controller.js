
import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

// ======================================================
// GENERATE INTERVIEW REPORT
// ======================================================

export const generateInterViewReportController = async (req, res) => {
    try {
        // Check if PDF was uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "Resume PDF is required.",
            });
        }

        // ------------------------------------------
        // PARSE PDF
        // ------------------------------------------

        const parser = new PDFParse({
            data: Uint8Array.from(req.file.buffer),
        });

        const resumeContent = await parser.getText();

        // ------------------------------------------
        // GET BODY
        // ------------------------------------------

        const {
            selfDescription,
            jobDescription,
        } = req.body;

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                message:
                    "Self description and job description are required.",
            });
        }

        // ------------------------------------------
        // GENERATE AI REPORT
        // ------------------------------------------

        const interviewReportByAi =
            await generateInterviewReport({
                resume: resumeContent.text,
                selfDescription,
                jobDescription,
            });

        console.log(
            "AI REPORT FROM CONTROLLER:"
        );

        console.dir(interviewReportByAi, {
            depth: null,
        });

        console.log(
            "TITLE:",
            interviewReportByAi.title
        );

        console.log(
            "TECHNICAL QUESTIONS:",
            interviewReportByAi.technicalQuestions
        );

        console.log(
            "BEHAVIORAL QUESTIONS:",
            interviewReportByAi.behavioralQuestions
        );

        console.log(
            "SKILL GAPS:",
            interviewReportByAi.skillGaps
        );

        console.log(
            "PREPARATION PLAN:",
            interviewReportByAi.preparationPlan
        );

        // ------------------------------------------
        // SAVE TO DATABASE
        // ------------------------------------------

        const interviewReport =
            await interviewReportModel.create({
                user: req.user.id,

                resume: resumeContent.text,

                selfDescription,

                jobDescription,

                title: interviewReportByAi.title,

                matchScore:
                    interviewReportByAi.matchScore,

                technicalQuestions:
                    interviewReportByAi.technicalQuestions,

                behavioralQuestions:
                    interviewReportByAi.behavioralQuestions,

                skillGaps:
                    interviewReportByAi.skillGaps,

                preparationPlan:
                    interviewReportByAi.preparationPlan,
            });

        // ------------------------------------------
        // RESPONSE
        // ------------------------------------------

        return res.status(200).json({
            message:
                "Interview report generated successfully",

            interviewReport,
        });

    } catch (error) {

        console.error(
            "Generate interview report error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to generate interview report",

            error: error.message,
        });
    }
};

// ======================================================
// GET REPORT BY ID
// ======================================================

export const getInterviewReportByIdController = async (
    req,
    res
) => {
    try {

        const { interviewId } = req.params;

        const interviewReport =
            await interviewReportModel.findOne({
                _id: interviewId,
                user: req.user.id,
            });

        if (!interviewReport) {
            return res.status(404).json({
                message:
                    "Interview report not found.",
            });
        }

        return res.status(200).json({
            message:
                "Interview report fetched successfully",

            interviewReport,
        });

    } catch (error) {

        console.error(
            "Get interview report error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch interview report",

            error: error.message,
        });
    }
};

// ======================================================
// GET ALL REPORTS
// ======================================================

export const getAllInterviewReportsController = async (
    req,
    res
) => {
    try {

        const interviewReports =
            await interviewReportModel
                .find({
                    user: req.user.id,
                })
                .sort({
                    createdAt: -1,
                })
                .select(
                    "-resume -selfDescription -jobDescription -__v -updatedAt -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
                );

        return res.status(200).json({
            message:
                "Interview Reports fetched successfully",

            interviewReports,
        });

    } catch (error) {

        console.error(
            "Get all interview reports error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch interview reports",

            error: error.message,
        });
    }
};

