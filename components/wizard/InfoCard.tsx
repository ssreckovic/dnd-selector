"use client";

import { useState, type ReactNode } from "react";

type InfoCardProps = {
  name: string;
  blurb: string;
  detail: string[];
  selected: boolean;
  onSelect: () => void;
  padding?: "sm" | "md";
  footer?: ReactNode;
  cornerTag?: ReactNode;
  wikiUrl?: string;
};

export function InfoCard({
  name,
  blurb,
  detail,
  selected,
  onSelect,
  padding = "md",
  footer,
  cornerTag,
  wikiUrl,
}: InfoCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={selected}
      aria-label={name}
      className={`relative rounded border text-left transition-colors ${padding === "sm" ? "p-3" : "p-4"} ${
        selected ? "border-amber-600 bg-amber-50" : "border-zinc-300 hover:bg-zinc-50"
      }`}
    >
      {cornerTag}
      <div className="flex items-center gap-2">
        <span className="font-medium">{name}</span>
      </div>
      <div className={`text-sm text-zinc-600 hidden lg:block ${showInfo &&  "block!"}`}>{blurb}</div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowInfo((prev) => !prev);
        }}
        aria-pressed={showInfo}
        className="mt-2 text-xs font-medium text-amber-700 underline"
      >
        {showInfo ? "Hide info" : "Show info"}
      </button>
      {showInfo && (
        <ul className="mt-2 list-disc border-t border-zinc-200 pl-4 pt-2 text-sm text-zinc-700">
          {detail.map((point) => (
            <li key={point}>{point}</li>
          ))}
          {wikiUrl && (
            <li className="list-none pl-0 -ml-4 mt-1">
              <a
                href={wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-amber-700 underline"
              >
                View on D&D 5e Wiki
              </a>
            </li>
          )}
        </ul>
      )}
      {footer && (
        <div onClick={(e) => e.stopPropagation()}>{footer}</div>
      )}
    </div>
  );
}
