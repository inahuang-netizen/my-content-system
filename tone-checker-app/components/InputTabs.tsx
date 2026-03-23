"use client";

type Mode = "text" | "image";

export default function InputTabs({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
      {(["text", "image"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            mode === m
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {m === "text" ? "Text" : "Screenshot"}
        </button>
      ))}
    </div>
  );
}
