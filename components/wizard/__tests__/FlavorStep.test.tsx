import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlavorStep } from "@/components/wizard/FlavorStep";

describe("FlavorStep", () => {
  it("reports combat role, magic interest, and social style selections independently", async () => {
    const onChange = vi.fn();
    render(
      <FlavorStep
        combatRole={null}
        magicInterest={null}
        socialStyle={null}
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    expect(onChange).toHaveBeenCalledWith({ combatRole: "melee" });

    await userEvent.click(screen.getByRole("button", { name: /^a lot$/i }));
    expect(onChange).toHaveBeenCalledWith({ magicInterest: "lot" });

    await userEvent.click(screen.getByRole("button", { name: /leader/i }));
    expect(onChange).toHaveBeenCalledWith({ socialStyle: "leader" });
  });

  it("highlights the currently selected option in each group", () => {
    render(
      <FlavorStep
        combatRole="ranged"
        magicInterest={null}
        socialStyle={null}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /ranged/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /melee/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
