import axios from "axios";

const api = axios.create({
    baseURL: "https://interviewai-backend-a4o0.onrender.com",
    withCredentials: true,
});

export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
}) => {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(
        `/api/interview/report/${interviewId}`
    );

    return response.data;
};

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/");

    return response.data;
};

export const generateResumePdf = async (interviewId) => {
    try {
        const response = await api.post(
            `/api/interview/resume/pdf/${interviewId}`,
            {},
            {
                withCredentials: true,
                responseType: "blob",
            }
        );

        return response.data;
    } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
        console.log("MESSAGE:", error.message);

        throw error;
    }
};