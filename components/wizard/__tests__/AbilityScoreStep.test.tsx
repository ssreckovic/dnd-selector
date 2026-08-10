import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AbilityScoreStep } from "@/components/wizard/AbilityScoreStep";

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
      <AbilityScoreStep
        abilityScoreGuidance="manual"
        abilityScoreMethod="standard-array"
        abilityScores={null}
        onChange={onChange}
      />,
    );
    const strInput = screen.getByLabelText("STR");
    await userEvent.type(strInput, "15");
    expect(onChange).toHaveBeenLastCalledWith({
      abilityScores: { str: 15, dex: null, con: null, int: null, wis: null, cha: null },
    });
  });
});
