"use client";

import ScoreBadge from "./ScoreBadge";

type Category = {
  name: string;
  status: "pass" | "flag";
  note: string;
};

type Report = {
  score: number;
  verdict: string;
  categories: Category[];
  summary: string;
};

export default function ReportCard({ report }: { report: Report }) {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Score header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Tone check report</h2>
        <ScoreBadge score={report.score} />
      </div>

      {/* Category rows */}
      <div className="divide-y divide-gray-100">
        {report.categories.map((cat) => (
          <div key={cat.name} className="px-6 py-3">
            <div className="flex items-center gap-2">
              {cat.status === "pass" ? (
                <span className="text-green-500 text-base leading-none">✓</span>
              ) : (
                <span className="text-amber-400 text-base leading-none">⚠</span>
              )}
              <span
                className={`text-sm font-medium ${
                  cat.status === "pass" ? "text-gray-700" : "text-gray-900"
                }`}
              >
                {cat.name}
              </span>
            </div>
            {cat.status === "flag" && cat.note && (
              <p className="mt-1 ml-6 text-xs text-gray-500">{cat.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      {report.summary && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">{report.summary}</p>
        </div>
      )}
    </div>
  );
}
