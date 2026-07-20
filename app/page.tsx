"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const modes = [
    "🎬 Creator",
    "💼 Business",
    "📖 Novel",
    "🚀 Startup",
    "💼 Career",
    "🎓 Learning",
  ];

  async function generateIdea() {
    if (!idea.trim()) return;

    setLoading(true);

    // API will be connected in the next step.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617,#1e1b4b,#312e81)",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "52px",
            fontWeight: "bold",
          }}
        >
          💡 One Idea AI
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginTop: "10px",
            fontSize: "20px",
          }}
        >
          One Idea.
          <br />
          Unlimited Possibilities.
        </p>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setIdea(mode)}
              style={{
                padding: "12px 20px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                background: "#334155",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: "30px",
            background: "rgba(255,255,255,.08)",
            borderRadius: "25px",
            padding: "25px",
          }}
        >
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder={`Example:

🎬 I want a YouTube channel about AI

💼 I want to start a coffee business

📖 I want to write a fantasy novel`}
            style={{
              width: "100%",
              minHeight: "220px",
              background: "#111827",
              color: "white",
              border: "1px solid #334155",
              borderRadius: "20px",
              padding: "20px",
              resize: "none",
              fontSize: "18px",
            }}
          />

          <button
            onClick={generateIdea}
            disabled={loading}
            style={{
              marginTop: "20px",
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
            {loading ? "🤖 Thinking..." : "✨ Discover Opportunities"}
          </button>
        </div>

        <div
          style={{
            marginTop: "35px",
            background: "rgba(255,255,255,.08)",
            padding: "25px",
            borderRadius: "25px",
          }}
        >
          <h2>🔥 Creator Mode</h2>

          <p style={{ color: "#cbd5e1" }}>
            Generate:
          </p>

          <ul
            style={{
              marginTop: "10px",
              lineHeight: "2",
            }}
          >
            <li>🎬 Video Ideas</li>
            <li>📝 Scripts</li>
            <li>🖼 Thumbnail Prompts</li>
            <li>📄 Captions</li>
            <li>🏷 Hashtags</li>
            <li>📅 Smart Schedule</li>
          </ul>
        </div>
      </div>
    </main>
  );
}