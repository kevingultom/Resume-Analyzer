"use client";

import { useCallback, useRef, useState } from "react";
import type { AnalysisResult } from "@/types/analysis";
import { useApp } from "./AppProviders";

interface ResumeUploaderProps {
  onResult: (result: AnalysisResult) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function ResumeUploader({ onResult }: ResumeUploaderProps) {
  const { t, language } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = useCallback(
    (candidate: File | undefined) => {
      if (!candidate) return;
      setError(null);

      if (candidate.type !== "application/pdf") {
        setError(t.errorInvalidType);
        return;
      }
      if (candidate.size > MAX_FILE_SIZE) {
        setError(t.errorTooLarge);
        return;
      }
      setFile(candidate);
    },
    [t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      validateAndSetFile(e.dataTransfer.files?.[0]);
    },
    [validateAndSetFile]
  );

  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || t.errorGeneric);
      }

      onResult(data as AnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric);
    } finally {
      setIsAnalyzing(false);
    }
  }, [file, onResult, language, t]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors
          ${
            isDragging
              ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/30"
              : "border-slate-300 bg-white hover:border-brand-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-500 dark:hover:bg-slate-800"
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => validateAndSetFile(e.target.files?.[0])}
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-7 w-7 text-brand-600 dark:text-brand-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
        </div>

        {file ? (
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-100">
              {file.name}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB — {t.replaceHint}
            </p>
          </div>
        ) : (
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {t.dropzoneTitle}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.dropzoneSubtitle}
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!file || isAnalyzing}
        className="mt-6 w-full rounded-xl bg-brand-600 px-6 py-3.5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            {t.analyzing}
          </span>
        ) : (
          t.analyzeButton
        )}
      </button>
    </div>
  );
}
