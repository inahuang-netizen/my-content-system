"use client";

import { useCallback, useState } from "react";

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (base64: string, mimeType: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const base64 = result.split(",")[1];
        setPreview(result);
        onUpload(base64, file.type);
      };
      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`relative w-full rounded-xl border-2 border-dashed transition-colors flex flex-col items-center justify-center min-h-[200px] cursor-pointer ${
        dragging ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
      />
      {preview ? (
        <img src={preview} alt="Uploaded screenshot" className="max-h-64 rounded-lg object-contain" />
      ) : (
        <div className="text-center p-8">
          <p className="text-sm font-medium text-gray-600">Drop a screenshot here</p>
          <p className="text-xs text-gray-400 mt-1">or click to browse — PNG, JPG, WebP</p>
        </div>
      )}
    </div>
  );
}
