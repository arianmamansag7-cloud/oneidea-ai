"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [brain, setBrain] = useState("");
  const [loading, setLoading] = useState(false);

  const quickIdeas = [
    "AI app for small businesses",
    "YouTube automation channel",
    "Fantasy novel idea",
    "AI assistant platform",
    "Online business idea",
  ];

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
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      setBrain(data.brain);
      setResult(data.result);

    } catch {
      setResult("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background:
          "radial-gradient(circle at top,#2563eb,#020617)",
        color: "white",
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
            fontSize: "48px",
            textAlign: "center",
          }}
        >
          🚀 One Idea AI
        </h1>

        <p
          style={{
            textAlign:"center",
            opacity:.8,
            fontSize:"18px"
          }}
        >
          Turn simple ideas into business opportunities.
        </p>


        <div
          style={{
            marginTop:"30px",
            display:"flex",
            gap:"10px",
            flexWrap:"wrap",
            justifyContent:"center"
          }}
        >
          {quickIdeas.map((item)=>(
            <button
              key={item}
              onClick={()=>setIdea(item)}
              style={{
                padding:"10px 15px",
                borderRadius:"20px",
                border:"1px solid #ffffff40",
                background:"#ffffff15",
                color:"white",
                cursor:"pointer"
              }}
            >
              {item}
            </button>
          ))}
        </div>


        <textarea
          value={idea}
          onChange={(e)=>setIdea(e.target.value)}
          placeholder="Describe your idea..."
          style={{
            width:"100%",
            minHeight:"160px",
            marginTop:"30px",
            padding:"20px",
            borderRadius:"16px",
            fontSize:"18px"
          }}
        />


        <button
          onClick={generateIdea}
          disabled={loading}
          style={{
            marginTop:"20px",
            width:"100%",
            padding:"15px",
            borderRadius:"15px",
            background:"#2563eb",
            color:"white",
            fontSize:"18px",
            cursor:"pointer"
          }}
        >
          {loading ? "🧠 Forging Idea..." : "⚡ Generate"}
        </button>


        {brain && (
          <div
            style={{
              marginTop:"30px",
              padding:"20px",
              borderRadius:"16px",
              background:"#ffffff15"
            }}
          >
            🧠 Brain Used:
            <h3>{brain}</h3>
          </div>
        )}


        {result && (
          <div
            style={{
              marginTop:"20px",
              padding:"25px",
              borderRadius:"16px",
              background:"#ffffff15",
              whiteSpace:"pre-wrap",
              lineHeight:"1.6"
            }}
          >
            <h2>📊 AI Analysis Report</h2>
            <br/>
            {result}
          </div>
        )}

      </div>
    </main>
  );
}
