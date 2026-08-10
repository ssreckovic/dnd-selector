import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import type {
  AbilityScoreGuidance,
  AbilityScoreMethod,
  AbilityScores,
} from "@/lib/wizard-storage";
import { AbilityScoreStep } from "@/components/wizard/AbilityScoreStep";

// Wrapper component to simulate parent maintaining state
function AbilityScoreStepWithState({
  initialGuidance,
  initialMethod,
  initialScores,
  onChangeSpy,
}: {
  initialGuidance: AbilityScoreGuidance | null;
  initialMethod: AbilityScoreMethod | null;
  initialScores: AbilityScores | null;
  onChangeSpy: (partial: {
    abilityScoreGuidance?: AbilityScoreGuidance;
    abilityScoreMethod?: AbilityScoreMethod | null;
    abilityScores?: AbilityScores | null;
  }) => void;
}) {
  const [guidance, setGuidance] = useState<AbilityScoreGuidance | null>(initialGuidance);
  const [method, setMethod] = useState<AbilityScoreMethod | null>(initialMethod);
  const [scores, setScores] = useState<AbilityScores | null>(initialScores);

  return (
    <AbilityScoreStep
      abilityScoreGuidance={guidance}
      abilityScoreMethod={method}
      abilityScores={scores}
      onChange={(partial) => {
        if (partial.abilityScoreGuidance !== undefined) {
          setGuidance(partial.abilityScoreGuidance);
        }
        if (partial.abilityScoreMethod !== undefined) {
          setMethod(partial.abilityScoreMethod);
        }
        if (partial.abilityScores !== undefined) {
          setScores(partial.abilityScores);
        }
        onChangeSpy(partial);
      }}
    />
  );
}

describe("AbilityScoreStep", () => {
  it("reports 'auto' guidance and clears method/scores", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStep
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /choose my stats for me/i }));
    expect(onChange).toHaveBeenCalledWith({
      abilityScoreGuidance: "auto",
      abilityScoreMethod: null,
      abilityScores: null,
    });
  });

  it("does not show method or score inputs until 'build my own' or 'walk me through' is chosen", () => {
    render(
      <AbilityScoreStep
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        onChange={vi.fn()}
      />,
    );
    expect(screen.queryByText(/which method/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("STR")).not.toBeInTheDocument();
  });

  it("shows the method row after choosing 'build my own', and reports the chosen method", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStep
        abilityScoreGuidance="manual"
        abilityScoreMethod={null}
        abilityScores={null}
        onChange={onChange}
      />,
    );
    expect(screen.getByText(/which method/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /standard array/i }));
    expect(onChange).toHaveBeenCalledWith({ abilityScoreMethod: "standard-array" });
  });

  it("shows guided tips for each method only when guidance is 'guided'", () => {
    render(
      <AbilityScoreStep
        abilityScoreGuidance="guided"
        abilityScoreMethod={null}
        abilityScores={null}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/drop the lowest/i)).toBeInTheDocument();
  });

  it("shows the six score inputs once a method is chosen, and reports edits", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={null}
        onChangeSpy={onChange}
      />,
    );
    const strInput = screen.getByLabelText("STR");
    await userEvent.type(strInput, "15");
    expect(onChange).toHaveBeenLastCalledWith({
      abilityScores: { str: 15, dex: null, con: null, int: null, wis: null, cha: null },
    });
  });

  it("preserves other ability scores when editing one field", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={{ str: 12, dex: null, con: null, int: null, wis: null, cha: null }}
        onChangeSpy={onChange}
      />,
    );
    const dexInput = screen.getByLabelText("DEX");
    await userEvent.type(dexInput, "14");
    expect(onChange).toHaveBeenLastCalledWith({
      abilityScores: { str: 12, dex: 14, con: null, int: null, wis: null, cha: null },
    });
  });

  it("clears a score to null when input is emptied", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={{ str: 12, dex: null, con: null, int: null, wis: null, cha: null }}
        onChangeSpy={onChange}
      />,
    );
    const strInput = screen.getByLabelText("STR") as HTMLInputElement;
    await userEvent.clear(strInput);
    expect(onChange).toHaveBeenLastCalledWith({
      abilityScores: { str: null, dex: null, con: null, int: null, wis: null, cha: null },
    });
  });
});
