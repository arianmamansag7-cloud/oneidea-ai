type Props = {
  title: string;
  icon: string;
  content: string;
};

export default function ResultCard({
  title,
  icon,
  content,
}: Props) {
  const copy = async () => {
    await navigator.clipboard.writeText(content);
    alert("Copied!");
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,.08)",
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>
        {icon} {title}
      </h2>

      <div
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
        }}
      >
        {content}
      </div>

      <button
        onClick={copy}
        style={{
          marginTop: "15px",
          padding: "10px 18px",
          borderRadius: "999px",
          border: "none",
          background: "#facc15",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        📋 Copy
      </button>
    </div>
  );
}