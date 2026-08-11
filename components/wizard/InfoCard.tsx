"use client";

import { useState, type ReactNode } from "react";

type InfoCardProps = {
  name: string;
  blurb: string;
  detail: string;
  selected: boolean;
  onSelect: () => void;
  badge?: ReactNode;
  padding?: "sm" | "md";
};

export function InfoCard({
  name,
  blurb,
  detail,
  selected,
  onSelect,
  badge,
  padding = "md",
}: InfoCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={`rounded border transition-colors ${padding === "sm" ? "p-3" : "p-4"} ${
        selected ? "border-amber-600 bg-amber-50" : "border-zinc-300 hover:bg-zinc-50"
      }`}
    >
      <button type="button" onClick={onSelect} aria-label={name} className="block w-full text-left">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          {badge}
        </div>
        <div className="text-sm text-zinc-600">{blurb}</div>
      </button>
      <button
        type="button"
        onClick={() => setShowInfo((prev) => !prev)}
        aria-pressed={showInfo}
        className="mt-2 text-xs font-medium text-amber-700 underline"
      >
        {showInfo ? "Hide info" : "Show info"}
      </button>
      {showInfo && (
        <div className="mt-2 border-t border-zinc-200 pt-2 text-sm text-zinc-700">
          {detail}
        </div>
      )}
    </div>
  );
}
