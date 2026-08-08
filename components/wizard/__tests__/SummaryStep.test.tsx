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
});
