import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassStep } from "@/components/wizard/ClassStep";

describe("ClassStep", () => {
  it("renders all 12 classes even with no flavor answers", () => {
    render(
      <ClassStep classId={null} flavorAnswers={null} onSelectClass={vi.fn()} />,
    );
    expect(screen.getAllByRole("button")).toHaveLength(12);
  });

  it("marks the top-matching classes as recommended when flavor answers are present", () => {
    render(
      <ClassStep
        classId={null}
        flavorAnswers={{ combatRole: "melee", magicInterest: "none", socialStyle: "loner" }}
        onSelectClass={vi.fn()}
      />,
    );
    expect(screen.getAllByText(/recommended for you/i).length).toBeGreaterThan(0);
  });

  it("reports the selected class", async () => {
    const onSelectClass = vi.fn();
    render(
      <ClassStep classId={null} flavorAnswers={null} onSelectClass={onSelectClass} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /wizard/i }));
    expect(onSelectClass).toHaveBeenCalledWith("wizard");
  });
});
