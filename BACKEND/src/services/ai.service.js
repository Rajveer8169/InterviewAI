import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import puppeteer from "puppeteer";

console.log(
    "AI SERVICE KEY EXISTS:",
    !!process.env.GOOGLE_GENAI_API_KEY
);

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// =====================================================
// ZOD SCHEMA
// =====================================================

const interviewReportSchema = z.object({
    title: z.string(),

    matchScore: z
        .number()
        .min(0)
        .max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string(),
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string(),
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),

            severity: z.enum([
                "low",
                "medium",
                "high",
            ]),
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),

            focus: z.string(),

            tasks: z.array(
                z.string()
            ),
        })
    ),
});

// =====================================================
// GEMINI RESPONSE SCHEMA
// =====================================================

const interviewResponseSchema = {
    type: "object",

    properties: {
        title: {
            type: "string",
        },

        matchScore: {
            type: "number",
        },

        technicalQuestions: {
            type: "array",

            items: {
                type: "object",

                properties: {
                    question: {
                        type: "string",
                    },

                    intention: {
                        type: "string",
                    },

                    answer: {
                        type: "string",
                    },
                },

                required: [
                    "question",
                    "intention",
                    "answer",
                ],
            },
        },

        behavioralQuestions: {
            type: "array",

            items: {
                type: "object",

                properties: {
                    question: {
                        type: "string",
                    },

                    intention: {
                        type: "string",
                    },

                    answer: {
                        type: "string",
                    },
                },

                required: [
                    "question",
                    "intention",
                    "answer",
                ],
            },
        },

        skillGaps: {
            type: "array",

            items: {
                type: "object",

                properties: {
                    skill: {
                        type: "string",
                    },

                    severity: {
                        type: "string",

                        enum: [
                            "low",
                            "medium",
                            "high",
                        ],
                    },
                },

                required: [
                    "skill",
                    "severity",
                ],
            },
        },

        preparationPlan: {
            type: "array",

            items: {
                type: "object",

                properties: {
                    day: {
                        type: "number",
                    },

                    focus: {
                        type: "string",
                    },

                    tasks: {
                        type: "array",

                        items: {
                            type: "string",
                        },
                    },
                },

                required: [
                    "day",
                    "focus",
                    "tasks",
                ],
            },
        },
    },

    required: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
    ],
};

// =====================================================
// GENERATE INTERVIEW REPORT
// =====================================================

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}) {
    try {

        const prompt = `
You are an expert technical recruiter and interview preparation assistant.

Analyze the following candidate.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Generate an interview preparation report.

IMPORTANT RULES:

1. Return ONLY JSON.
2. Do NOT return markdown.
3. Do NOT return text outside JSON.
4. Follow the provided response schema exactly.
5. Generate exactly 5 technical questions.
6. Generate exactly 5 behavioral questions.
7. Generate at most 5 skill gaps.
8. Generate exactly 7 preparation plan days.
9. Keep answers concise.
10. matchScore must be between 0 and 100.
11. title must be the job title from the job description.

VERY IMPORTANT:

technicalQuestions MUST be an array of OBJECTS.

Each technicalQuestions object MUST have:

{
    "question": "...",
    "intention": "...",
    "answer": "..."
}

Do NOT return:

"technicalQuestions": [
    "question 1",
    "question 2"
]

Instead return:

"technicalQuestions": [
    {
        "question": "question 1",
        "intention": "why interviewer asks it",
        "answer": "how candidate should answer"
    }
]

behavioralQuestions MUST also contain objects.

skillGaps MUST contain objects with:
skill
severity

preparationPlan MUST contain objects with:
day
focus
tasks
`;

        // =================================================
        // GEMINI API CALL
        // =================================================

        const response =
            await ai.models.generateContent({

                model: "gemini-3-flash-preview",

                contents: prompt,

                config: {
                    responseMimeType:
                        "application/json",

                    responseSchema:
                        interviewResponseSchema,
                },
            });

        // =================================================
        // GET RESPONSE
        // =================================================

        const text = response.text;

        console.log(
            "Gemini response received."
        );

        console.log(
            "Response length:",
            text?.length
        );

        if (!text) {
            throw new Error(
                "Gemini returned an empty response."
            );
        }

        // =================================================
        // PARSE JSON
        // =================================================

        let result;

        try {

            result = JSON.parse(text);

        } catch (error) {

            console.error(
                "Gemini returned invalid JSON."
            );

            console.error(
                error.message
            );

            console.error(
                text.substring(0, 2000)
            );

            throw error;
        }

        // =================================================
        // DEBUG
        // =================================================

        console.log(
            "RAW GEMINI RESULT:"
        );

        console.dir(
            result,
            {
                depth: null,
            }
        );

        // =================================================
        // ZOD VALIDATION
        // =================================================

        const validatedResult =
            interviewReportSchema.parse(
                result
            );

        return validatedResult;

    } catch (error) {

        console.error(
            "Generate interview report error:",
            error
        );

        throw error;
    }
}

// =====================================================
// GENERATE PDF FROM HTML
// =====================================================

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,

    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",

      printBackground: true,

      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

// =====================================================
// GENERATE RESUME PDF
// =====================================================

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
}) {

    const resumePdfSchema =
        z.object({
            html: z.string(),
        });

    const resumeResponseSchema = {
        type: "object",

        properties: {
            html: {
                type: "string",
            },
        },

        required: [
            "html",
        ],
    };

    const prompt = `
Generate a professional ATS-friendly resume.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Requirements:

1. Return ONLY JSON.
2. JSON must contain only one field: html.
3. html must contain the complete resume.
4. Tailor the resume to the job description.
5. Do not invent experience or skills.
6. Make it professional and simple.
7. Make it ATS friendly.
8. Keep it 1 page.
9. Use HTML and CSS.
10. Do not return markdown.
`;

    const response =
        await ai.models.generateContent({

            model: "gemini-3-flash-preview",

            contents: prompt,

            config: {
                responseMimeType:
                    "application/json",

                responseSchema:
                    resumeResponseSchema,
            },
        });

    const text = response.text;

    if (!text) {
        throw new Error(
            "Gemini returned an empty resume response."
        );
    }

    let jsonContent;

    try {

        jsonContent =
            JSON.parse(text);

    } catch (error) {

        console.error(
            "Invalid resume JSON:",
            error.message
        );

        console.error(
            text.substring(0, 2000)
        );

        throw error;
    }

    const validatedContent =
        resumePdfSchema.parse(
            jsonContent
        );

    const pdfBuffer =
        await generatePdfFromHtml(
            validatedContent.html
        );

    return pdfBuffer;
}

// =====================================================
// EXPORT
// =====================================================

export {
    generateInterviewReport,
    generateResumePdf,
};

export default generateInterviewReport;

