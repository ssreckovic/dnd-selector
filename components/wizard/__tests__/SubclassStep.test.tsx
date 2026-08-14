import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubclassStep } from "@/components/wizard/SubclassStep";

describe("SubclassStep", () => {
  it("shows all subclasses", () => {
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: /champion/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /arcane archer/i })).toBeInTheDocument();
  });

  it("tags the first subclass as easy", () => {
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={vi.fn()} />,
    );
    const champion = screen.getByRole("button", { name: /champion/i });
    expect(champion).toHaveTextContent(/easy/i);
  });

  it("reports the selected subclass", async () => {
    const onSelectSubclass = vi.fn();
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={onSelectSubclass} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    expect(onSelectSubclass).toHaveBeenCalledWith("champion");
  });

  it("links to the subclass's dnd5e wiki page in the info panel", async () => {
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={vi.fn()} />,
    );
    const champion = screen.getByRole("button", { name: /champion/i });
    await userEvent.click(
      screen.getAllByRole("button", { name: /show info/i })[0],
      { pointerEventsCheck: 0 },
    );
    const link = champion.querySelector("a");
    expect(link).toHaveAttribute("href", "https://dnd5e.wikidot.com/fighter:champion");
  });
});
