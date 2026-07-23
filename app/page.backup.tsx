"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function forgeIdea() {
    if (!idea.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
        }),
      });

      const data = await res.json();

      setResult(data.result);
    } catch (err) {
      setResult("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          🧠 Forge AI
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "20px",
            marginBottom: "40px",
          }}
        >
          Forge Ideas. Build Reality.
        </p>

        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your goal...

Example:

I want to earn $100/month.

I want to build an AI YouTube channel.

I want to write a novel."
          style={{
            width: "100%",
            minHeight: "220px",
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155",
            borderRadius: "20px",
            padding: "20px",
            fontSize: "18px",
            resize: "none",
          }}
        />

        <button
          onClick={forgeIdea}
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            background: "#facc15",
            color: "#111827",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "⚡ Forging..." : "⚡ Forge My Idea"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "40px",
              background: "#1e293b",
              padding: "25px",
              borderRadius: "20px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
            }}
          >
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
