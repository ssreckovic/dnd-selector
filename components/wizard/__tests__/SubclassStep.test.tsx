import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubclassStep } from "@/components/wizard/SubclassStep";

describe("SubclassStep", () => {
  it("shows only the default subclasses initially", () => {
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: /champion/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /arcane archer/i }),
    ).not.toBeInTheDocument();
  });

  it("reveals all subclasses after clicking the show-all toggle", async () => {
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={vi.fn()} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /show all subclasses/i }));
    expect(screen.getByRole("button", { name: /arcane archer/i })).toBeInTheDocument();
  });

  it("reports the selected subclass", async () => {
    const onSelectSubclass = vi.fn();
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={onSelectSubclass} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    expect(onSelectSubclass).toHaveBeenCalledWith("champion");
  });
});
