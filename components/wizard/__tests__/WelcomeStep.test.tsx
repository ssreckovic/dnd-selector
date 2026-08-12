import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WelcomeStep } from "@/components/wizard/WelcomeStep";

describe("WelcomeStep", () => {
  it("shows the current player name and reports changes", async () => {
    const onPlayerNameChange = vi.fn();
    render(
      <WelcomeStep
        playerName="Sasha"
        onPlayerNameChange={onPlayerNameChange}
        effortLevel={null}
        onSelectEffort={vi.fn()}
      />,
    );

    const input = screen.getByLabelText(/your name/i);
    expect(input).toHaveValue("Sasha");

    await userEvent.type(input, "!");
    expect(onPlayerNameChange).toHaveBeenLastCalledWith("Sasha!");
  });

  it("reports the selected effort level", async () => {
    const onSelectEffort = vi.fn();
    render(
      <WelcomeStep
        playerName=""
        onPlayerNameChange={vi.fn()}
        effortLevel={null}
        onSelectEffort={onSelectEffort}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /minimal/i }));
    expect(onSelectEffort).toHaveBeenCalledWith("minimal");
  });

  it("highlights the currently selected effort level", () => {
    render(
      <WelcomeStep
        playerName=""
        onPlayerNameChange={vi.fn()}
        effortLevel="some"
        onSelectEffort={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /^some\b/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
