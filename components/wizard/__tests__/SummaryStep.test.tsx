import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SummaryStep } from "@/components/wizard/SummaryStep";
import { EMPTY_ANSWERS } from "@/lib/wizard-storage";

describe("SummaryStep", () => {
  it("recaps the chosen race, subrace, class, and subclass by name", () => {
    render(
      <SummaryStep
        answers={{
          ...EMPTY_ANSWERS,
          playerName: "Sasha",
          raceId: "elf",
          subraceId: "wood-elf",
          classId: "ranger",
          subclassId: "hunter",
        }}
        onCharacterNameChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/wood elf/i)).toBeInTheDocument();
    expect(screen.getByText(/ranger/i)).toBeInTheDocument();
    expect(screen.getByText(/hunter/i)).toBeInTheDocument();
  });

  it("reports character name changes", async () => {
    const onCharacterNameChange = vi.fn();
    render(
      <SummaryStep
        answers={{ ...EMPTY_ANSWERS, raceId: "human", classId: "bard", subclassId: "lore" }}
        onCharacterNameChange={onCharacterNameChange}
      />,
    );

    await userEvent.type(screen.getByLabelText(/character name/i), "T");
    expect(onCharacterNameChange).toHaveBeenLastCalledWith("T");
  });

  it("shows the ability score guidance, method, and any entered scores", () => {
    render(
      <SummaryStep
        answers={{
          ...EMPTY_ANSWERS,
          raceId: "human",
          classId: "barbarian",
          subclassId: "berserker",
          abilityScoreGuidance: "manual",
          abilityScoreMethod: "point-buy",
          abilityScores: { str: 15, dex: null, con: 14, int: null, wis: null, cha: null },
        }}
        onCharacterNameChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/i'll build my own/i)).toBeInTheDocument();
    expect(screen.getByText(/point buy/i)).toBeInTheDocument();
    expect(screen.getByText(/str 15/i)).toBeInTheDocument();
    expect(screen.getByText(/con 14/i)).toBeInTheDocument();
  });

  it("shows the spell choice and Silvery Barbs note for a spellcasting class, and hides it for a non-caster", () => {
    const { rerender } = render(
      <SummaryStep
        answers={{
          ...EMPTY_ANSWERS,
          raceId: "human",
          classId: "wizard",
          subclassId: "evocation",
          spellChoiceMode: "suggestions",
        }}
        onCharacterNameChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/getting a list of suggestions/i)).toBeInTheDocument();
    expect(screen.getByText(/silvery barbs/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see spell options/i })).toHaveAttribute(
      "href",
      "/spells?class=wizard",
    );

    rerender(
      <SummaryStep
        answers={{
          ...EMPTY_ANSWERS,
          raceId: "human",
          classId: "barbarian",
          subclassId: "berserker",
        }}
        onCharacterNameChange={vi.fn()}
      />,
    );
    expect(screen.queryByText(/silvery barbs/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /see spell options/i })).not.toBeInTheDocument();
  });
});
