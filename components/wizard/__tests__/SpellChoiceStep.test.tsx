import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpellChoiceStep } from "@/components/wizard/SpellChoiceStep";

describe("SpellChoiceStep", () => {
  it("always shows the Silvery Barbs house-rule notice", () => {
    render(
      <SpellChoiceStep
        spellChoiceMode={null}
        onSelectSpellChoiceMode={vi.fn()}
        effortLevel="all"
      />,
    );
    expect(screen.getByText(/silvery barbs/i)).toBeInTheDocument();
    expect(screen.getByText(/not an allowed spell/i)).toBeInTheDocument();
  });

  it("reports the selected spell choice mode", async () => {
    const onSelectSpellChoiceMode = vi.fn();
    render(
      <SpellChoiceStep
        spellChoiceMode={null}
        onSelectSpellChoiceMode={onSelectSpellChoiceMode}
        effortLevel="all"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /give me a list of suggestions/i }));
    expect(onSelectSpellChoiceMode).toHaveBeenCalledWith("suggestions");
  });

  it("highlights the currently selected option", () => {
    render(
      <SpellChoiceStep spellChoiceMode="auto" onSelectSpellChoiceMode={vi.fn()} effortLevel="all" />,
    );
    expect(screen.getByRole("button", { name: /pick my spells for me/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows the default-to-auto note only at 'some' effort", () => {
    const { rerender } = render(
      <SpellChoiceStep spellChoiceMode="auto" onSelectSpellChoiceMode={vi.fn()} effortLevel="some" />,
    );
    expect(screen.getByText(/defaulted to picking spells for you/i)).toBeInTheDocument();

    rerender(
      <SpellChoiceStep spellChoiceMode={null} onSelectSpellChoiceMode={vi.fn()} effortLevel="all" />,
    );
    expect(screen.queryByText(/defaulted to picking spells for you/i)).not.toBeInTheDocument();
  });
});
