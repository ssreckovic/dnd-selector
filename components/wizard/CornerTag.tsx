import type { ReactNode } from "react";

type CornerTagProps = {
  children: ReactNode;
};

export function CornerTag({ children }: CornerTagProps) {
  return (
    <span className="absolute -top-2 -right-2 rounded-full bg-amber-600 px-2 py-0.5 text-xs font-semibold text-white shadow">
      {children}
    </span>
  );
}
