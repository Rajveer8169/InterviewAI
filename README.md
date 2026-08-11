# 🤖 Interview AI

An AI-powered interview preparation platform that analyzes a candidate's resume, self-description, and target job description to generate a personalized interview preparation report.

The platform uses **Google Gemini AI** to generate technical questions, behavioral questions, skill gaps, and a structured preparation plan. It also provides AI-powered resume generation and PDF export.

---

## 🚀 Live Demo

**Frontend:** https://interviewai-frontend-83hz.onrender.com

**Backend:** https://interviewai-backend-a4o0.onrender.com

---

## 📸 Features

* 🔐 JWT-based authentication
* 👤 User registration and login
* 🍪 Secure HTTP-only cookie authentication
* 📄 Resume PDF upload and parsing
* 🤖 AI-powered interview report generation
* 💻 Technical interview questions
* 🧠 Behavioral interview questions
* 📊 Resume-to-job match score
* ⚠️ Skill gap analysis
* 📅 Personalized interview preparation plan
* 📋 View and manage previous interview reports
* 📄 AI-generated ATS-friendly resumes
* ⬇️ Download generated resume as PDF
* 🛡️ Protected API routes
* 🗄️ MongoDB database integration

---

## 🧠 How It Works

```text
                 ┌────────────────────┐
                 │      User          │
                 └─────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   React Frontend    │
                └──────────┬──────────┘
                           │
                           │ REST API
                           ▼
                ┌─────────────────────┐
                │ Express.js Backend  │
                └──────────┬──────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌─────────────┐
        │ MongoDB  │ │ PDF Parse│ │ Gemini AI   │
        └──────────┘ └──────────┘ └──────┬──────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │ Interview Report│
                                └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │ Puppeteer PDF    │
                                └─────────────────┘
```

---

## ✨ Main Features

### 🔐 Authentication

Users can register and log in securely using:

* JWT
* bcryptjs
* HTTP-only cookies
* Protected Express routes

Authentication tokens are stored in HTTP-only cookies to prevent direct JavaScript access.

---

### 📄 Resume Analysis

Users upload their resume as a PDF.

The backend extracts the resume text using:

```text
pdf-parse
```

The extracted resume information is then sent to Gemini AI along with:

* Candidate self-description
* Target job description

---

### 🤖 AI Interview Report

Google Gemini AI analyzes the candidate's profile and generates:

#### Match Score

A score between **0–100** indicating how well the candidate matches the target job.

#### Technical Questions

Each question contains:

```json
{
  "question": "What is JWT authentication?",
  "intention": "Evaluate understanding of authentication mechanisms.",
  "answer": "JWT is a token-based authentication mechanism..."
}
```

#### Behavioral Questions

Questions designed to prepare candidates for HR and behavioral interviews.

#### Skill Gaps

Identifies missing or weak skills:

```json
{
  "skill": "Docker",
  "severity": "high"
}
```

#### Preparation Plan

Generates a structured multi-day preparation plan containing:

* Day
* Focus
* Tasks

---

## 📄 AI Resume Generator

Interview AI can also generate an ATS-friendly resume based on:

* Existing resume
* Candidate self-description
* Target job description

Gemini generates the resume as HTML/CSS, which is then converted into a PDF using **Puppeteer**.

```text
Resume
   ↓
Gemini AI
   ↓
ATS-friendly HTML
   ↓
Puppeteer
   ↓
PDF Resume
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* JavaScript
* Tailwind CSS
* Axios
* React Router

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Cookie Parser
* Multer

## AI & Processing

* Google Gemini AI
* `@google/genai`
* Zod
* pdf-parse
* Puppeteer

## Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

---

# 📁 Project Structure

```text
INTERVIEW-AI/
│
├── BACKEND/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── interviewReport.model.js
│   │   │
│   │   ├── routes/
│   │   │
│   │   ├── middleware/
│   │   │
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   │
│   │   └── utils/
│   │
│   ├── app.js
│   ├── package.json
│   └── .puppeteerrc.js
│
│
└── FRONTEND/
    │
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   └── App.jsx
    │
    ├── package.json
    └── ...
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/Rajveer8169/InterviewAI.git
```

```bash
cd InterviewAI
```

---

## 2. Backend Setup

```bash
cd BACKEND
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start the development server:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd FRONTEND
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

---

# 🔑 Environment Variables

### Backend

| Variable               | Description                    |
| ---------------------- | ------------------------------ |
| `PORT`                 | Backend server port            |
| `MONGO_URI`            | MongoDB connection string      |
| `JWT_SECRET`           | Secret used to sign JWT tokens |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key          |

Never commit your `.env` file to GitHub.

---

# 🔌 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Logout

```http
POST /api/auth/logout
```

### Get Current User

```http
GET /api/auth/get-me
```

---

## Interview Reports

### Generate Interview Report

```http
POST /api/interview/generate
```

Uploads:

* Resume PDF
* Self description
* Job description

### Get Interview Report

```http
GET /api/interview/:interviewId
```

### Get All Interview Reports

```http
GET /api/interview
```

### Generate Resume PDF

```http
GET /api/interview/:interviewReportId/resume
```

---

# 🔒 Security

The application implements several security practices:

* JWT authentication
* HTTP-only cookies
* Password hashing using bcrypt
* Protected API routes
* User-specific database queries
* CORS configuration
* Environment variables for secrets
* Input validation using Zod

---

# 🧪 AI Response Validation

Gemini responses are validated using **Zod** before being stored in MongoDB.

Example:

```js
const validatedResult =
  interviewReportSchema.parse(result);
```

This ensures that the AI response follows the expected structure before entering the database.

---

# 🚀 Deployment

## Frontend

The React frontend is deployed using:

```text
Vercel
```

## Backend

The Node.js/Express backend is deployed using:

```text
Render
```

## Database

MongoDB Atlas is used for cloud database hosting.

---

# 📌 Future Improvements

* 🎤 AI-powered mock interviews
* 🎙️ Voice-based interview mode
* 📹 Video interview analysis
* 📈 Interview performance tracking
* 📝 Coding interview questions
* ⏱️ Real-time interview timer
* 📊 Candidate performance dashboard
* 📧 Interview report sharing
* 🌐 Support for multiple AI models

---

# 👨‍💻 Author

**Rajveer Rai**

### Connect with me

* GitHub: https://github.com/Rajveer8169

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub!
