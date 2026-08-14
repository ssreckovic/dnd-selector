import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import type {
  AbilityScoreBonusAssignment,
  AbilityScoreBonusMode,
  AbilityScoreGuidance,
  AbilityScoreMethod,
  AbilityScores,
} from "@/lib/wizard-storage";
import { AbilityScoreStep } from "@/components/wizard/AbilityScoreStep";

type ChangePartial = {
  abilityScoreGuidance?: AbilityScoreGuidance;
  abilityScoreMethod?: AbilityScoreMethod | null;
  abilityScores?: AbilityScores | null;
  abilityScoreBonusMode?: AbilityScoreBonusMode | null;
  abilityScoreBonusAssignment?: AbilityScoreBonusAssignment | null;
};

// Wrapper component to simulate parent maintaining state
function AbilityScoreStepWithState({
  initialGuidance,
  initialMethod,
  initialScores,
  initialBonusMode = null,
  initialBonusAssignment = null,
  onChangeSpy,
}: {
  initialGuidance: AbilityScoreGuidance | null;
  initialMethod: AbilityScoreMethod | null;
  initialScores: AbilityScores | null;
  initialBonusMode?: AbilityScoreBonusMode | null;
  initialBonusAssignment?: AbilityScoreBonusAssignment | null;
  onChangeSpy: (partial: ChangePartial) => void;
}) {
  const [guidance, setGuidance] = useState<AbilityScoreGuidance | null>(initialGuidance);
  const [method, setMethod] = useState<AbilityScoreMethod | null>(initialMethod);
  const [scores, setScores] = useState<AbilityScores | null>(initialScores);
  const [bonusMode, setBonusMode] = useState<AbilityScoreBonusMode | null>(initialBonusMode);
  const [bonusAssignment, setBonusAssignment] = useState<AbilityScoreBonusAssignment | null>(
    initialBonusAssignment,
  );

  return (
    <AbilityScoreStep
      classId={null}
      abilityScoreGuidance={guidance}
      abilityScoreMethod={method}
      abilityScores={scores}
      abilityScoreBonusMode={bonusMode}
      abilityScoreBonusAssignment={bonusAssignment}
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
        if (partial.abilityScoreBonusMode !== undefined) {
          setBonusMode(partial.abilityScoreBonusMode);
        }
        if (partial.abilityScoreBonusAssignment !== undefined) {
          setBonusAssignment(partial.abilityScoreBonusAssignment);
        }
        onChangeSpy(partial);
      }}
    />
  );
}

describe("AbilityScoreStep", () => {
  it("reports 'auto' guidance and clears method/scores/bonus", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStep
        classId={null}
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        abilityScoreBonusMode={null}
        abilityScoreBonusAssignment={null}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /choose my stats for me/i }));
    expect(onChange).toHaveBeenCalledWith({
      abilityScoreGuidance: "auto",
      abilityScoreMethod: null,
      abilityScores: null,
      abilityScoreBonusMode: null,
      abilityScoreBonusAssignment: null,
    });
  });

  it("does not show the assignment UI until 'build my own' or 'walk me through' is chosen", () => {
    render(
      <AbilityScoreStep
        classId={null}
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        abilityScoreBonusMode={null}
        abilityScoreBonusAssignment={null}
        onChange={vi.fn()}
      />,
    );
    expect(screen.queryByLabelText("STR")).not.toBeInTheDocument();
  });

  it("sets method to standard-array when guidance becomes manual", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStep
        classId={null}
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        abilityScoreBonusMode={null}
        abilityScoreBonusAssignment={null}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /build my own/i }));
    expect(onChange).toHaveBeenCalledWith({
      abilityScoreGuidance: "manual",
      abilityScoreMethod: "standard-array",
    });
  });

  it("shows a guided tip only when guidance is 'guided'", () => {
    render(
      <AbilityScoreStep
        classId={null}
        abilityScoreGuidance="guided"
        abilityScoreMethod="standard-array"
        abilityScores={null}
        abilityScoreBonusMode={null}
        abilityScoreBonusAssignment={null}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/assign 15, 14, 13, 12, 10, and 8/i)).toBeInTheDocument();
  });

  it("shows the six ability selects once manual guidance is chosen, and reports edits", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={null}
        onChangeSpy={onChange}
      />,
    );
    const strSelect = screen.getByLabelText("STR");
    await userEvent.selectOptions(strSelect, "15");
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
    const dexSelect = screen.getByLabelText("DEX");
    await userEvent.selectOptions(dexSelect, "14");
    expect(onChange).toHaveBeenLastCalledWith({
      abilityScores: { str: 12, dex: 14, con: null, int: null, wis: null, cha: null },
    });
  });

  it("does not offer a value already assigned to another ability", () => {
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={{ str: 15, dex: null, con: null, int: null, wis: null, cha: null }}
        onChangeSpy={vi.fn()}
      />,
    );
    const dexSelect = screen.getByLabelText("DEX") as HTMLSelectElement;
    const options = Array.from(dexSelect.options).map((o) => o.value);
    expect(options).not.toContain("15");
  });

  it("clears a score to null when reset to the placeholder option", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={{ str: 12, dex: null, con: null, int: null, wis: null, cha: null }}
        onChangeSpy={onChange}
      />,
    );
    const strSelect = screen.getByLabelText("STR") as HTMLSelectElement;
    await userEvent.selectOptions(strSelect, "");
    expect(onChange).toHaveBeenLastCalledWith({
      abilityScores: { str: null, dex: null, con: null, int: null, wis: null, cha: null },
    });
  });

  it("assigns three +1 bonuses to distinct abilities and shows final scores", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={{ str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 }}
        onChangeSpy={onChange}
      />,
    );
    await userEvent.selectOptions(screen.getByLabelText("Bonus split"), "three-plus-one");
    await userEvent.selectOptions(screen.getByLabelText("+1 ability #1"), "str");
    await userEvent.selectOptions(screen.getByLabelText("+1 ability #2"), "dex");
    await userEvent.selectOptions(screen.getByLabelText("+1 ability #3"), "con");

    expect(onChange).toHaveBeenLastCalledWith({
      abilityScoreBonusAssignment: [
        { key: "str", bonus: 1 },
        { key: "dex", bonus: 1 },
        { key: "con", bonus: 1 },
      ],
    });
  });

  it("does not offer an ability already picked in another bonus slot", async () => {
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={{ str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 }}
        initialBonusMode="plus-two-plus-one"
        initialBonusAssignment={[{ key: "str", bonus: 2 }]}
        onChangeSpy={vi.fn()}
      />,
    );
    const plusOneSelect = screen.getByLabelText("+1 ability") as HTMLSelectElement;
    const options = Array.from(plusOneSelect.options).map((o) => o.value);
    expect(options).not.toContain("str");
  });

  it("shows the class's primary abilities and spellcasting explanation when a class is chosen", () => {
    render(
      <AbilityScoreStep
        classId="wizard"
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        abilityScoreBonusMode={null}
        abilityScoreBonusAssignment={null}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/as a wizard, intelligence matters most for you/i)).toBeInTheDocument();
    expect(screen.getByText(/spellcasting ability/i)).toBeInTheDocument();
  });

  it("does not show a spellcasting explanation for non-caster classes", () => {
    render(
      <AbilityScoreStep
        classId="barbarian"
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        abilityScoreBonusMode={null}
        abilityScoreBonusAssignment={null}
        onChange={vi.fn()}
      />,
    );
    expect(
      screen.getByText(/as a barbarian, strength and constitution matter most for you/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/spellcasting ability/i)).not.toBeInTheDocument();
  });

  it("clears the prior bonus assignment when switching bonus mode", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStepWithState
        initialGuidance="manual"
        initialMethod="standard-array"
        initialScores={{ str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 }}
        initialBonusMode="plus-two-plus-one"
        initialBonusAssignment={[{ key: "str", bonus: 2 }]}
        onChangeSpy={onChange}
      />,
    );
    await userEvent.selectOptions(screen.getByLabelText("Bonus split"), "three-plus-one");
    expect(onChange).toHaveBeenCalledWith({
      abilityScoreBonusMode: "three-plus-one",
      abilityScoreBonusAssignment: null,
    });
  });
});
