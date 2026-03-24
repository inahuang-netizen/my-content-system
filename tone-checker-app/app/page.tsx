"use client";

import { useState } from "react";
import InputTabs from "@/components/InputTabs";
import CopyInput from "@/components/CopyInput";
import ImageUpload from "@/components/ImageUpload";
import ReportCard from "@/components/ReportCard";

type Mode = "text" | "image";

type Report = {
  score: number;
  verdict: string;
  categories: { name: string; status: "pass" | "flag"; note: string }[];
  summary: string;
};

export default function Home() {
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [image, setImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = mode === "text" ? text.trim().length > 0 : image !== null;

  async function handleCheck() {
    setReport(null);
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

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? `Error ${res.status}`);
        return;
      }

      setReport(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setReport(null);
    setError("");
    setText("");
    setImage(null);
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

        {/* Loading state */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
            <p className="text-sm text-gray-400">Checking your content...</p>
          </div>
        )}

        {/* Input card — hidden while loading or showing report */}
        {!loading && !report && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-4">
              <InputTabs mode={mode} onChange={(m) => { setMode(m); setError(""); }} />
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
              disabled={!canSubmit}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Check content →
            </button>
          </div>
        )}

        {/* Report */}
        {report && <ReportCard report={report} />}

        {/* Check another */}
        {report && (
          <div className="mt-4 text-center">
            <button
              onClick={handleReset}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Check another
            </button>
          </div>
        )}

        {/* Footer */}
        {!loading && (
          <p className="mt-8 text-center text-xs text-gray-400">
            Powered by Claude Opus 4.6 · Intuit Content Style Guide
          </p>
        )}
      </div>
    </main>
  );
}
