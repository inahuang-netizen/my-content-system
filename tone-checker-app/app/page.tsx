"use client";

import { useState } from "react";
import InputTabs from "@/components/InputTabs";
import CopyInput from "@/components/CopyInput";
import ImageUpload from "@/components/ImageUpload";
import ResultsPanel from "@/components/ResultsPanel";

type Mode = "text" | "image";

export default function Home() {
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [image, setImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = mode === "text" ? text.trim().length > 0 : image !== null;

  async function handleCheck() {
    setResult("");
    setError("");
    setLoading(true);

    try {
      const body =
        mode === "text"
          ? { mode, text }
          : { mode, image: image!.base64, mimeType: image!.mimeType };

      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setError("Something went wrong. Check your API key and try again.");
        setLoading(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setResult(accumulated);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
            SF Dining Cam
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Tone checker</h1>
          <p className="text-sm text-gray-500 mt-1">
            Check copy against the Intuit Content Style Guide
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-4">
            <InputTabs mode={mode} onChange={(m) => { setMode(m); setResult(""); setError(""); }} />
          </div>

          {mode === "text" ? (
            <CopyInput value={text} onChange={setText} />
          ) : (
            <ImageUpload onUpload={(base64, mimeType) => setImage({ base64, mimeType })} />
          )}

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleCheck}
            disabled={!canSubmit || loading}
            className="mt-4 w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Checking..." : "Check content →"}
          </button>
        </div>

        {/* Results */}
        <ResultsPanel content={result} loading={loading} />

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          Powered by Claude Opus 4.6 · Intuit Content Style Guide
        </p>
      </div>
    </main>
  );
}
