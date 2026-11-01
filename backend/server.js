
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const {
      companyName,
      applyingAsA,
      jobDescription,
      currentResume,
      coverLetterTone,
    } = req.body;

    const prompt = `You are a professional career coach and resume optimization expert.
Generate a personalized cover letter, improved resume content, and ATS analysis.

Inputs:
Company Name: ${companyName}
Experience Level: ${applyingAsA}
Job Description: ${jobDescription}
Current Resume: ${currentResume}
Preferred Tone: ${coverLetterTone}

Return ONLY valid JSON. No markdown. No extra text. Use exactly these keys:
{
  "coverLetter": "string",
  "resume": "string",
  "keywords": ["string"],
  "atsScore": 0,
  "atsReason": "string"
}

Rules:
- coverLetter: letter to ${companyName} in ${coverLetterTone} tone
- resume: optimized summary, bullets, and skills for the job
- keywords: important JD keywords missing from the resume
- atsScore: number 0 to 100
- atsReason: short explanation of the score
`;

    const groqResponse = await fetch(process.env.GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.log(errorText);
      return res.status(500).json({ error: "Groq request failed" });
    }

    const data = await groqResponse.json();
    const content = data?.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(content);

    res.json(parsed);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
