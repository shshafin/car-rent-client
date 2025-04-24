import { useState } from "react";

export default function Translator() {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("th");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    if (!text) return;

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });

      const data = await response.json();
      setTranslatedText(data.translation);
    } catch (error) {
      alert("Translation failed. Check console for details.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          style={{ padding: "0.5rem", width: "70%", marginRight: "0.5rem" }}
        />
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          style={{ padding: "0.5rem" }}>
          <option value="th">ไทย (Thai)</option>
          <option value="en">English</option>
        </select>
      </div>
      <button
        onClick={handleTranslate}
        style={{
          padding: "0.5rem 1rem",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}>
        Translate
      </button>

      {translatedText && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ddd",
          }}>
          <h3>Translation:</h3>
          <p style={{ fontFamily: "Noto Sans Thai, sans-serif" }}>
            {translatedText}
          </p>
        </div>
      )}
    </div>
  );
}
