"use client";

export default function ScoreBadge({ score }: { score: number }) {
  const { label, color } = (() => {
    if (score >= 90) return { label: "Publish-ready", color: "bg-green-100 text-green-800 ring-green-200" };
    if (score >= 75) return { label: "Minor revisions", color: "bg-blue-100 text-blue-800 ring-blue-200" };
    if (score >= 60) return { label: "Significant revisions", color: "bg-yellow-100 text-yellow-800 ring-yellow-200" };
    return { label: "Rewrite required", color: "bg-red-100 text-red-800 ring-red-200" };
  })();

  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl ring-1 ${color}`}>
      <span className="text-2xl font-bold">{score}</span>
      <div>
        <p className="text-xs font-medium opacity-70">out of 100</p>
        <p className="text-sm font-semibold">{label}</p>
      </div>
    </div>
  );
}
