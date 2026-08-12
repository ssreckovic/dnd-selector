import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
