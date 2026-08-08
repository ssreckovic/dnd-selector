import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WelcomeStep } from "@/components/wizard/WelcomeStep";

describe("WelcomeStep", () => {
  it("shows the current player name and reports changes", async () => {
    const onPlayerNameChange = vi.fn();
    render(
      <WelcomeStep playerName="Sasha" onPlayerNameChange={onPlayerNameChange} />,
    );

    const input = screen.getByLabelText(/your name/i);
    expect(input).toHaveValue("Sasha");

    await userEvent.type(input, "!");
    expect(onPlayerNameChange).toHaveBeenLastCalledWith("Sasha!");
  });
});
