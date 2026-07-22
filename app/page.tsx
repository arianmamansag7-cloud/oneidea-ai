"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [brain, setBrain] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateIdea() {
    if (!idea.trim()) return;

    setLoading(true);
    setResult("");
    setBrain("");

    try {
      const res = await fetch("/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
        }),
      });

      const data = await res.json();

      setBrain(data.brain);
      setResult(data.result);

    } catch (error) {
      setResult("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg,#111827,#1e3a8a)",
        color: "white",
      }}
    >
      <h1>
        🚀 One Idea AI
      </h1>

      <p>
        Turn simple ideas into business opportunities.
      </p>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter your idea..."
        style={{
          width: "100%",
          minHeight: "150px",
          padding: "15px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      />

      <button
        onClick={generateIdea}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {loading ? "Forging..." : "Generate"}
      </button>


      {brain && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          🧠 Brain Used:
          <br />
          <strong>{brain}</strong>
        </div>
      )}


      {result && (
        <div
          style={{
            marginTop: "20px",
            whiteSpace: "pre-wrap",
            padding: "20px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
          }}
        >
          <h2>AI Analysis Report</h2>
          {result}
        </div>
      )}

    </main>
  );
}
