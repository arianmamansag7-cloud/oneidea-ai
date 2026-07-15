"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateIdea() {
    if (!idea.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      setResult(data.result);
    } catch {
      setResult("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  const quickIdeas = [
    "AI App",
    "YouTube Channel",
    "Novel",
    "Side Hustle",
    "AI Assistant",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#1e1b4b,#312e81)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "900",
            marginBottom: "10px",
          }}
        >
          🤖 One Idea AI
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#cbd5e1",
            marginBottom: "35px",
          }}
        >
          Turn simple ideas into real opportunities
        </p>

        <div
          style={{
            background: "rgba(255,255,255,.08)",
            padding: "25px",
            borderRadius: "30px",
            backdropFilter: "blur(10px)",
          }}
        >
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Type your idea here...

Example:
AI coffee shop for students"
            style={{
              width: "100%",
              minHeight: "170px",
              padding: "20px",
              borderRadius: "20px",
              fontSize: "18px",
              color: "white",
              background: "rgba(0,0,0,.3)",
              border: "1px solid rgba(255,255,255,.2)",
              resize: "none",
              boxSizing: "border-box",
            }}
          />

          <p
            style={{
              textAlign: "right",
              color: "#94a3b8",
            }}
          >
            {idea.length} characters
          </p>

          <div>
            {quickIdeas.map((item) => (
              <button
                key={item}
                onClick={() => setIdea(item)}
                style={{
                  margin: "5px",
                  padding: "10px 18px",
                  borderRadius: "50px",
                  border: "none",
                  background: "#334155",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={generateIdea}
            disabled={loading}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "18px",
              borderRadius: "50px",
              border: "none",
              background: "#facc15",
              color: "#111827",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "🤖 Thinking..." : "🚀 Generate Opportunity"}
          </button>
        </div>

        {result && (
          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              borderRadius: "25px",
              background: "rgba(255,255,255,.1)",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
            }}
          >
            {result}
          </div>
        )}
      </div>
    </main>
  );
}