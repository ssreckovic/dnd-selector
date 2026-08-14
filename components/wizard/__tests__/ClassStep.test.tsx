import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassStep } from "@/components/wizard/ClassStep";

describe("ClassStep", () => {
  it("renders all 12 classes", () => {
    render(<ClassStep classId={null} onSelectClass={vi.fn()} />);
    expect(screen.getAllByRole("button", { name: /show info/i })).toHaveLength(12);
  });

  it("does not show any recommendation badges", () => {
    render(<ClassStep classId={null} onSelectClass={vi.fn()} />);
    expect(screen.queryByText(/recommended for you/i)).not.toBeInTheDocument();
  });

  it("reports the selected class", async () => {
    const onSelectClass = vi.fn();
    render(<ClassStep classId={null} onSelectClass={onSelectClass} />);
    await userEvent.click(screen.getByRole("button", { name: /wizard/i }));
    expect(onSelectClass).toHaveBeenCalledWith("wizard");
  });

  it("shows a rules-heavy note for a selected base spellcasting class", () => {
    render(<ClassStep classId="wizard" onSelectClass={vi.fn()} />);
    expect(screen.getByText(/more rules to track in play/i)).toBeInTheDocument();
  });

  it("shows no rules-heavy note for a selected non-caster class", () => {
    render(<ClassStep classId="barbarian" onSelectClass={vi.fn()} />);
    expect(screen.queryByText(/more rules to track in play/i)).not.toBeInTheDocument();
  });

  it("shows no rules-heavy note for fighter, even though it has a spellcasting subclass option", () => {
    render(<ClassStep classId="fighter" onSelectClass={vi.fn()} />);
    expect(screen.queryByText(/more rules to track in play/i)).not.toBeInTheDocument();
  });

  it("shows a spells link for base spellcasting classes, pointing at the right class", () => {
    render(<ClassStep classId={null} onSelectClass={vi.fn()} />);
    const link = screen.getByRole("link", { name: /see wizard spells/i });
    expect(link).toHaveAttribute("href", "/spells?class=wizard");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("shows no spells link for a non-caster class", () => {
    render(<ClassStep classId={null} onSelectClass={vi.fn()} />);
    expect(screen.queryByRole("link", { name: /see barbarian spells/i })).not.toBeInTheDocument();
  });

  it("links to the class's dnd5e wiki page in the info panel", async () => {
    render(<ClassStep classId={null} onSelectClass={vi.fn()} />);
    const wizard = screen.getByRole("button", { name: /wizard/i });
    await userEvent.click(within(wizard).getByRole("button", { name: /show info/i }), {
      pointerEventsCheck: 0,
    });
    const link = within(wizard).getByRole("link", { name: /view on d&d 5e wiki/i });
    expect(link).toHaveAttribute("href", "https://dnd5e.wikidot.com/wizard");
  });
});
