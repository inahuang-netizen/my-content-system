"use client";

import ReactMarkdown from "react-markdown";
import ScoreBadge from "./ScoreBadge";

function extractScore(text: string): number | null {
  const match = text.match(/\*\*Score:\*\*\s*(\d+)\/100/);
  return match ? parseInt(match[1], 10) : null;
}

export default function ResultsPanel({
  content,
  loading,
}: {
  content: string;
  loading: boolean;
}) {
  if (!content && !loading) return null;

  const score = extractScore(content);

  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Tone Check Report</h2>
        {score !== null && <ScoreBadge score={score} />}
      </div>

      <div className="px-6 py-5">
        {loading && !content && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="animate-pulse">Checking content...</span>
          </div>
        )}

        <div className="prose prose-sm max-w-none text-gray-700
          prose-headings:text-gray-900 prose-headings:font-semibold
          prose-h2:text-base prose-h3:text-sm
          prose-table:text-sm prose-td:py-1 prose-th:py-1
          prose-strong:text-gray-900">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {loading && content && (
          <span className="inline-block w-1.5 h-4 bg-gray-400 animate-pulse rounded-sm ml-0.5" />
        )}
      </div>
    </div>
  );
}
