import "dotenv/config";

import express from "express";
import connectDB from "./src/config/database.js";
import dns from "dns";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import interviewRouter from "./src/routes/interview.routes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(cookieParser());

app.use(
    cors({
        origin: "https://interviewai-frontend-83hz.onrender.com",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});