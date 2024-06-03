"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState("");

  const [fileContent, setFileContent] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setFileContent("Loading...");
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setFileContent(data.content);
    if (data.language) setCurrentLanguage(data.language);
  };

  return (
    <main className="App">
      <div>
        <p>Current Language: {currentLanguage || "plain text"}</p>
        <p>
          <input type="file" onChange={handleFileUpload} />
        </p>
      </div>
      <Editor
        height="500px"
        language={currentLanguage}
        value={fileContent}
        theme="vs-dark"
      />
    </main>
  );
}
