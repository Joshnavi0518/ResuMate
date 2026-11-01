# ResuMate – AI-Powered Resume Optimizer

ResuMate is an AI-powered resume optimization platform designed to help job seekers improve their resumes and increase their chances of getting shortlisted. It analyzes job descriptions and generates tailored resume content, personalized cover letters, relevant keywords, and an estimated ATS score using AI.

## 🚀 Features

- **AI-Powered Resume Optimization:** Generates improved resume content based on the target job description.
- **Smart Cover Letter Generation:** Creates personalized cover letters for specific companies and job roles.
- **ATS Score Analysis:** Provides an estimated Applicant Tracking System (ATS) score with improvement suggestions.
- **Keyword Extraction:** Identifies important skills and keywords from job descriptions.
- **Company-Based Customization:** Tailors resume content according to the company and position.
- **Interactive Results Dashboard:** Displays generated resume content, cover letters, keywords, and ATS feedback.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST API

**AI Integration**
- Groq API
- Large Language Model (LLM)

**Tools**
- Git
- GitHub
- Visual Studio Code
- npm

## 📂 Project Structure

```text
ResuMate/
│
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── public/
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Results.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Joshnavi0518/ResuMate.git
```

### 2. Navigate to the Project Directory

```bash
cd ResuMate
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Configure Backend Environment Variables

Navigate to the backend directory:

```bash
cd backend
```

Create a `.env` file using `.env.example`.

For Windows:

```cmd
copy .env.example .env
```

For macOS/Linux:

```bash
cp .env.example .env
```

Add your Groq API credentials to the `.env` file:

```env
PORT=5000
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
GROQ_API_KEY=your_groq_api_key
```

Replace `your_groq_api_key` with your actual Groq API key.

### 5. Install Backend Dependencies

From the backend directory:

```bash
npm install
```

### 6. Start the Backend Server

```bash
node server.js
```

The backend server runs at:

```text
http://localhost:5000
```

### 7. Start the Frontend

Open another terminal and navigate to the project root directory:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## 🔄 Application Workflow

1. The user opens the ResuMate application.
2. Enters the target company name and job description.
3. Provides their existing resume content.
4. Selects the preferred cover letter tone.
5. The frontend sends the information to the Express backend.
6. The backend processes the request and communicates with the Groq AI API.
7. AI generates optimized resume content, a personalized cover letter, relevant keywords, and ATS feedback.
8. The results are displayed on the Results page.

## 🔌 API Endpoint

**Generate Resume and Cover Letter**

| Method | Endpoint |
|---|---|
| POST | `/api/generate` |

The API accepts the user's resume information and job description, processes the request using the Groq API, and returns the generated results.




## 🎯 Future Enhancements

- Resume PDF and DOCX upload support.
- Direct resume PDF download.
- Advanced ATS keyword matching.
- Multiple resume templates.
- User authentication and profile management.
- Resume version history.
- Cloud deployment and database integration.

