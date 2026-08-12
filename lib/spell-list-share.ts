export type SharedSpellList = {
  classId: string;
  spells: string[];
};

function toBase64Url(input: string): string {
  const base64 =
    typeof window === "undefined"
      ? Buffer.from(input, "utf-8").toString("base64")
      : window.btoa(unescape(encodeURIComponent(input)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return typeof window === "undefined"
    ? Buffer.from(padded, "base64").toString("utf-8")
    : decodeURIComponent(escape(window.atob(padded)));
}

export function encodeSpellList(classId: string, spells: string[]): string {
  return toBase64Url(JSON.stringify({ classId, spells }));
}

export function decodeSpellList(encoded: string): SharedSpellList | null {
  try {
    const parsed = JSON.parse(fromBase64Url(encoded));
    if (typeof parsed?.classId !== "string" || !Array.isArray(parsed.spells)) {
      return null;
    }
    if (!parsed.spells.every((s: unknown) => typeof s === "string")) {
      return null;
    }
    return { classId: parsed.classId, spells: parsed.spells };
  } catch {
    return null;
  }
}
