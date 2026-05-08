# ResuMate

ResuMate is an AI-powered **resume optimization** app that helps job seekers tailor applications for specific roles in minutes.

## Features

- Generate a tailored cover letter from a job description
- Rewrite resume content to match role requirements
- Extract and compare important keywords for ATS matching
- Estimate ATS score with quick improvement guidance

## Tech Stack

- React
- Vite
- Bootstrap
- Groq API

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ResuMate/Demo/ResMate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add:

```env
VITE_GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
VITE_GROQ_API_KEY=your_groq_api_key
```

### 4. Run locally

```bash
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Project Structure

```text
Demo/ResMate
├─ src/
│  ├─ pages/
│  │  └─ Home.jsx
│  ├─ App.jsx
│  ├─ App.css
│  └─ main.jsx
├─ .env
├─ package.json
└─ README.md
```

