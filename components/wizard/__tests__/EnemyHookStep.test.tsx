import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnemyHookStep } from "@/components/wizard/EnemyHookStep";

describe("EnemyHookStep", () => {
  it("shows the current enemy hook and reports changes", async () => {
    const onEnemyHookChange = vi.fn();
    render(<EnemyHookStep enemyHook="Ashfall Cartel" onEnemyHookChange={onEnemyHookChange} />);

    const textarea = screen.getByLabelText(/what did your character do/i);
    expect(textarea).toHaveValue("Ashfall Cartel");

    await userEvent.type(textarea, "!");
    expect(onEnemyHookChange).toHaveBeenLastCalledWith("Ashfall Cartel!");
  });
});
