"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);

async function generateIdea() {
  setLoading(true);

  const res = await fetch("/api/idea", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idea }),
  });

  const data = await res.json();

  setResult(data.result);
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
        background: "linear-gradient(135deg,#020617,#312e81)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            marginBottom: "10px",
            fontWeight: "bold",
            letterSpacing: "-2px",
          }}
        >
          One Idea AI
        </h1>

        <p
          style={{
            color: "#d1d5db",
            fontSize: "20px",
            marginBottom: "40px",
          }}
        >
          Turn One Idea Into Endless Opportunities
        </p>

        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="What's your next big idea?

Examples:
• AI Startup
• Mobile App
• YouTube Channel
• Side Hustle
• Novel"
          style={{
            width: "100%",
            minHeight: "180px",
            borderRadius: "24px",
            padding: "22px",
            fontSize: "18px",
            lineHeight: "1.6",
            border: "1px solid rgba(255,255,255,.15)",
            outline: "none",
            resize: "vertical",
            background: "rgba(255,255,255,.08)",
            color: "white",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 10,
            touchAction: "auto",
          }}
        />

        <p
          style={{
            textAlign: "right",
            color: "#94a3b8",
            marginTop: "8px",
          }}
        >
          {idea.length} characters
        </p>

        <p
          style={{
            marginTop: "25px",
            color: "#cbd5e1",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          ✨ Quick Start Ideas
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {quickIdeas.map((item) => (
            <button
              key={item}
              onClick={() => setIdea(item)}
              style={{
                background: "#1e293b",
                color: "white",
                border: "none",
                borderRadius: "999px",
                padding: "12px 22px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={generateIdea}
          disabled={!idea.trim()}
          style={{
            marginTop: "35px",
            padding: "18px 50px",
            borderRadius: "999px",
            border: "none",
            background: idea.trim() ? "#facc15" : "#64748b",
            color: "#111827",
            fontWeight: "bold",
            fontSize: "20px",
            cursor: idea.trim()
              ? "pointer"
              : "not-allowed",
            width: "100%",
            maxWidth: "450px",
          }}
        >
          🚀 Explore Opportunity
        </button>
{loading && (
          <p
            style={{
              marginTop: "30px",
              fontSize: "20px",
            }}
          >
            🤖 Thinking...
          </p>
        )}

        {result && (
          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              borderRadius: "20px",
              background: "rgba(255,255,255,.08)",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
            }}
          >
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
