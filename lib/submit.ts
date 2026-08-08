import type { WizardAnswers } from "@/lib/wizard-storage";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitConcept(
  answers: WizardAnswers,
): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;
  if (!endpoint) {
    return { ok: false, error: "Submission endpoint is not configured." };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      // text/plain avoids a CORS preflight against the Apps Script endpoint,
      // which does not implement OPTIONS handling.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        playerName: answers.playerName,
        characterName: answers.characterName,
        race: answers.raceId,
        subrace: answers.subraceId,
        class: answers.classId,
        subclass: answers.subclassId,
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
