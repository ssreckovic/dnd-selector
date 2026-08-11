import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InfoCard } from "@/components/wizard/InfoCard";

describe("InfoCard", () => {
  it("shows the name and blurb but not the detail by default", () => {
    render(
      <InfoCard
        name="Wizard"
        blurb="A scholarly spellcaster."
        detail="Learns spells from a spellbook."
        selected={false}
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("A scholarly spellcaster.")).toBeInTheDocument();
    expect(screen.queryByText("Learns spells from a spellbook.")).not.toBeInTheDocument();
  });

  it("reveals the detail when Show info is clicked, and hides it again on toggle", async () => {
    render(
      <InfoCard
        name="Wizard"
        blurb="A scholarly spellcaster."
        detail="Learns spells from a spellbook."
        selected={false}
        onSelect={vi.fn()}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /show info/i }));
    expect(screen.getByText("Learns spells from a spellbook.")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /hide info/i }));
    expect(screen.queryByText("Learns spells from a spellbook.")).not.toBeInTheDocument();
  });

  it("calls onSelect when the card is clicked, independent of the info toggle", async () => {
    const onSelect = vi.fn();
    render(
      <InfoCard
        name="Wizard"
        blurb="A scholarly spellcaster."
        detail="Learns spells from a spellbook."
        selected={false}
        onSelect={onSelect}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Wizard" }));
    expect(onSelect).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByRole("button", { name: /show info/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
