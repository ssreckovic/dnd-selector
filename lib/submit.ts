import type { WizardAnswers } from "@/lib/wizard-storage";
import { getRace, getClass } from "@/lib/dnd-data";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitConcept(
  answers: WizardAnswers,
): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;
  if (!endpoint) {
    return { ok: false, error: "Submission endpoint is not configured." };
  }

  const race = answers.raceId ? getRace(answers.raceId) : undefined;
  const subrace = race?.subraces?.find((s) => s.id === answers.subraceId);
  const cls = answers.classId ? getClass(answers.classId) : undefined;
  const subclass = cls?.allSubclasses.find((s) => s.id === answers.subclassId);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      // text/plain avoids a CORS preflight against the Apps Script endpoint,
      // which does not implement OPTIONS handling.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        playerName: answers.playerName,
        characterName: answers.characterName,
        race: race?.name ?? null,
        subrace: subrace?.name ?? null,
        class: cls?.name ?? null,
        subclass: subclass?.name ?? null,
      }),
    });

    if (!response.ok) {
      return { ok: false, error: `Request failed with status ${response.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown submission error",
    };
  }
}
