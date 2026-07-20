type ResultCardProps = {
  title: string;
  icon: string;
  content: string;
};

export default function ResultCard({
  title,
  icon,
  content,
}: ResultCardProps) {
  async function copyContent() {
    await navigator.clipboard.writeText(content);
    alert(`${title} copied!`);
  }

  return (
    <div
      style={{
        background: "rgba(255,255,255,.08)",
        padding: "20px",
        borderRadius: "20px",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          marginBottom: "15px",
          fontSize: "22px",
        }}
      >
        {icon} {title}
      </h3>

      <div
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
          color: "#e2e8f0",
        }}
      >
        {content}
      </div>

      <button
        onClick={copyContent}
        style={{
          marginTop: "15px",
          padding: "10px 18px",
          borderRadius: "999px",
          border: "none",
          background: "#facc15",
          color: "#111827",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        📋 Copy
      </button>
    </div>
  );
}