import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const geminiResponse = location.state;
  const [copiedKey, setCopiedKey] = useState("");

  async function copyText(key, text) {
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1500);
    } catch (err) {
      console.log(err);
    }
  }

  if (!geminiResponse) {
    return (
      <>
        <p>No result yet. Fill the form first.</p>
        <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>
          Go to form
        </button>
      </>
    );
  }

  const keywordsText = Array.isArray(geminiResponse.keywords)
    ? geminiResponse.keywords.join(", ")
    : geminiResponse.keywords || "";

  const atsText = [geminiResponse.atsScore, geminiResponse.atsReason]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <h1>Response from model</h1>

      <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>
        Back to form
      </button>

      <div className="response-table">
        <div className="response-cell">
          <div className="response-cell-header">
            <h3>Cover Letter</h3>
            <button
              type="button"
              className={`btn-copy ${copiedKey === "coverLetter" ? "copied" : ""}`}
              onClick={() => copyText("coverLetter", geminiResponse.coverLetter)}
            >
              {copiedKey === "coverLetter" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre>{geminiResponse.coverLetter || "No cover letter found."}</pre>
        </div>

        <div className="response-cell">
          <div className="response-cell-header">
            <h3>ATS Score</h3>
            <button
              type="button"
              className={`btn-copy ${copiedKey === "ats" ? "copied" : ""}`}
              onClick={() => copyText("ats", atsText)}
            >
              {copiedKey === "ats" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre>
            {geminiResponse.atsScore || "No ATS score found."}
            <br />
            {geminiResponse.atsReason || "No ATS reason found."}
          </pre>
        </div>

        <div className="response-cell">
          <div className="response-cell-header">
            <h3>Resume</h3>
            <button
              type="button"
              className={`btn-copy ${copiedKey === "resume" ? "copied" : ""}`}
              onClick={() => copyText("resume", geminiResponse.resume)}
            >
              {copiedKey === "resume" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre>{geminiResponse.resume || "No resume section found."}</pre>
        </div>

        <div className="response-cell">
          <div className="response-cell-header">
            <h3>Keywords</h3>
            <button
              type="button"
              className={`btn-copy ${copiedKey === "keywords" ? "copied" : ""}`}
              onClick={() => copyText("keywords", keywordsText)}
            >
              {copiedKey === "keywords" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre>{keywordsText || "No keywords found."}</pre>
        </div>
      </div>
    </>
  );
}

export default ResultsPage;