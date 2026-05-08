import React from "react";
import {useState} from "react";

function HomePage() {

    const [formData, setFormData] = useState({
        companyName: "",
        applyingAsA: "Fresher",
        jobDescription: "",
        currentResume: "",
        coverLetterTone: "Formal"
    });

    const [geminiResponse, setGeminiResponse] = useState("");
    const readSection = (text, startLabel, endLabels = []) => {
        const lowerText = text.toLowerCase();
        const start = lowerText.indexOf(startLabel.toLowerCase());
        if(start === -1){
            return "";
        }
        const fromStart = text.slice(start + startLabel.length);
        let endIndex = fromStart.length;
        for(const endLabel of endLabels){
            const idx = fromStart.toLowerCase().indexOf(endLabel.toLowerCase());
            if(idx !== -1 && idx < endIndex){
                endIndex = idx;
            }
        }
        return fromStart.slice(0, endIndex).trim();
    };
  async function handleGenerateData(){
        console.log(formData);
        const prompt= ` You are a professional career coach and resume optimization expert. 
Your task is to generate a personalized cover letter, improve the resume content, 
and provide an ATS (Applicant Tracking System) analysis.

Inputs:
Company Name: ${formData.companyName}
Experience Level: ${formData.applyingAsA}  (Fresher / Experienced)
Job Description: ${formData.jobDescription}
Current Resume: ${formData.currentResume} (If empty, assume no resume exists and create a draft)
Preferred Tone: ${formData.coverLetterTone}

Output (format clearly in sections):

1. Tailored Cover Letter  
Write a professional cover letter addressed to ${formData.companyName}.  
Use the specified tone: ${formData.coverLetterTone}.  
Highlight relevant skills and experiences based on the job description.  

2. Updated Resume Content  
Suggest optimized resume summary, bullet points, and skills tailored to ${formData.jobDescription}.  
Ensure the content is concise, achievement-focused, and ATS-friendly.  

3. Keyword Match Analysis  
Extract the most important keywords from the job description.  
Check if they exist in the provided resume (if given).  
List missing keywords that should be added.  

4. ATS Score Estimate (0–100)  
Provide a rough ATS match score for the current resume against the job description.  
Explain the reasoning briefly (e.g., missing keywords, formatting issues, irrelevant content).  

Ensure the response is structured, clear, and easy to display in a React app. 
        `
        try{
            const response = await fetch(import.meta.env.VITE_GROQ_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })
            });

            if(!response.ok){
                throw new Error("Failed to fetch data from Groq API");
            }

            const data = await response.json();
            const generatedResponse = data?.choices?.[0]?.message?.content || "No response generated";
            setGeminiResponse(generatedResponse);
        }
        catch(err){
            console.log(err);
            setGeminiResponse("Something went wrong while generating response.");
        }


    }

    return(
        <>
            <p>Welcome to the Resume Builder</p>

            <form>

                <div className="mb-3">
                    <label htmlFor="companyName" className="form-label">Company Name</label>

                    <input type="text" className="form-control" id="companyName" aria-describedby="companyHelp" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />

                    <div id="companyHelp" className="form-text">Company you are applying to!</div>
                </div>

                <div>
                    <label htmlFor="applyingAsA" className="form-label">Applying as a</label>

                    <select className="form-select" aria-label="Default select example" id="applyingAsA" value={formData.applyingAsA} onChange={(e) => setFormData({...formData, applyingAsA: e.target.value})}>
                        <option value="Fresher">Fresher</option>
                        <option value="Experienced">Experiened</option>
                    </select>
                </div>

                <div className="mb-3 form-check">
                    <label className="form-check-label" htmlFor="jobDescription">Enter the job description</label>

                    <textarea name="jobDescription" id="jobDescription" className="form-control" placeholder="Enter job description" value={formData.jobDescription} onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}></textarea>
                </div>

                <div className="mb-3 form-check">
                    <label className="form-check-label" htmlFor="currentResume">Paste your Current Resume Conetent</label>

                    <textarea name="currentResume" id="currentResume" className="form-control" placeholder="Paste your current resume content" value={formData.currentResume} onChange={(e) => setFormData({...formData, currentResume: e.target.value})}></textarea>
                </div>

                <div>
                    <label htmlFor="coverLetterTone" className="form-label">Cover Letter Tone</label>

                    <select className="form-select" aria-label="Default select example" id="coverLetterTone" value={formData.coverLetterTone} onChange={(e) => setFormData({...formData, coverLetterTone: e.target.value})}>
                        <option value="Formal">Formal</option>
                        <option value="Casual">Casual</option>
                    </select>
                </div>

                <button type="button" className="btn btn-primary" onClick={handleGenerateData}>Generate</button>

            </form>

            <h1> Response from model</h1>
            {geminiResponse && (
                <div className="response-table">
                    <div className="response-cell">
                        <h3>Cover Letter</h3>
                        <pre>{readSection(geminiResponse, "Tailored Cover Letter", ["Updated Resume Content", "Keyword Match Analysis", "ATS Score Estimate"]) || "No cover letter found."}</pre>
                    </div>
                    <div className="response-cell">
                        <h3>ATS Score</h3>
                        <pre>{readSection(geminiResponse, "ATS Score Estimate", []) || "No ATS score found."}</pre>
                    </div>
                    <div className="response-cell">
                        <h3>Resume</h3>
                        <pre>{readSection(geminiResponse, "Updated Resume Content", ["Keyword Match Analysis", "ATS Score Estimate"]) || "No resume section found."}</pre>
                    </div>
                    <div className="response-cell">
                        <h3>Keywords</h3>
                        <pre>{readSection(geminiResponse, "Keyword Match Analysis", ["ATS Score Estimate"]) || "No keywords section found."}</pre>
                    </div>
                </div>
            )}
        </>
    )
}

export default HomePage;