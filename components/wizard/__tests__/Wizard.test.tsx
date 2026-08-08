import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wizard } from "@/components/wizard/Wizard";
import * as submitModule from "@/lib/submit";

describe("Wizard", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("blocks advancing past Welcome until a player name is entered", async () => {
    render(<Wizard />);
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });

  it("walks forward through race, flavor, class, and subclass to the summary, and back again", async () => {
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Race step: human has no subrace, so Next should be enabled right after picking it.
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Flavor step
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Class step
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Subclass step
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText(/review your concept/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByText(/choose your fighter subclass/i)).toBeInTheDocument();
  });

  it("submits the concept and shows a confirmation on success", async () => {
    vi.spyOn(submitModule, "submitConcept").mockResolvedValue({ ok: true });
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    await userEvent.type(screen.getByLabelText(/character name/i), "Torren");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/your concept has been submitted/i)).toBeInTheDocument();
  });
});
