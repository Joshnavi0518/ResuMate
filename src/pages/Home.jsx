import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    applyingAsA: "Fresher",
    jobDescription: "",
    currentResume: "",
    coverLetterTone: "Formal",
  });

  const [errors, setErrors] = useState({
    companyName: "",
    jobDescription: "",
    currentResume: "",
  });


  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  async function handleGenerateData(event) {
    event.preventDefault();

    const newErrors = {
      companyName: formData.companyName.trim() ? "" : "this field is mandatory!",
      jobDescription: formData.jobDescription.trim() ? "" : "this field is mandatory!",
      currentResume: formData.currentResume.trim() ? "" : "this field is mandatory!",
    };

    setErrors(newErrors);
    setApiError("");

    if (newErrors.companyName || newErrors.jobDescription || newErrors.currentResume) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from backend");
      }

      const parsedResponse = await response.json();
      navigate("/results", { state: parsedResponse });
    } catch (err) {
      console.log(err);
      setApiError("Something went wrong while generating response.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <p>Welcome to the Resume Builder</p>


      {apiError && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fecaca",
            border: "1px solid #ef4444",
            borderRadius: "10px",
            padding: "12px 14px",
            marginBottom: "14px",
          }}
        >
          {apiError}
        </div>
      )}

      <form onSubmit={handleGenerateData}>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            aria-describedby="companyHelp"
            value={formData.companyName}
            onChange={(e) => {
              setFormData({ ...formData, companyName: e.target.value });
              setErrors({ ...errors, companyName: "" });
            }}
          />
          {errors.companyName && (
            <div style={{ color: "red", fontSize: "0.9rem", marginTop: "6px" }}>
              {errors.companyName}
            </div>
          )}
          <div id="companyHelp" className="form-text">Company you are applying to!</div>
        </div>

        <div>
          <label htmlFor="applyingAsA" className="form-label">Applying as a</label>
          <select
            className="form-select"
            id="applyingAsA"
            value={formData.applyingAsA}
            onChange={(e) => setFormData({ ...formData, applyingAsA: e.target.value })}
          >
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="jobDescription">Enter the job description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            className="form-control"
            placeholder="Enter job description"
            value={formData.jobDescription}
            onChange={(e) => {
              setFormData({ ...formData, jobDescription: e.target.value });
              setErrors({ ...errors, jobDescription: "" });
            }}
          ></textarea>
          {errors.jobDescription && (
            <div style={{ color: "red", fontSize: "0.9rem", marginTop: "6px" }}>
              {errors.jobDescription}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="currentResume">Paste your Current Resume Content</label>
          <textarea
            name="currentResume"
            id="currentResume"
            className="form-control"
            placeholder="Paste your current resume content"
            value={formData.currentResume}
            onChange={(e) => {
              setFormData({ ...formData, currentResume: e.target.value });
              setErrors({ ...errors, currentResume: "" });
            }}
          ></textarea>
          {errors.currentResume && (
            <div style={{ color: "red", fontSize: "0.9rem", marginTop: "6px" }}>
              {errors.currentResume}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="coverLetterTone" className="form-label">Cover Letter Tone</label>
          <select
            className="form-select"
            id="coverLetterTone"
            value={formData.coverLetterTone}
            onChange={(e) => setFormData({ ...formData, coverLetterTone: e.target.value })}
          >
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate"}
         
        </button>
      </form>
    </>
  );
}

export default HomePage;