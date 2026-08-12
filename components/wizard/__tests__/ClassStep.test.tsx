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
});
