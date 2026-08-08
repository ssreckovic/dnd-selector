import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RaceStep } from "@/components/wizard/RaceStep";

describe("RaceStep", () => {
  it("selects a race without subraces directly", async () => {
    const onSelectRace = vi.fn();
    const onSelectSubrace = vi.fn();
    render(
      <RaceStep
        raceId={null}
        subraceId={null}
        onSelectRace={onSelectRace}
        onSelectSubrace={onSelectSubrace}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /human/i }));
    expect(onSelectRace).toHaveBeenCalledWith("human");
  });

  it("shows subrace options once a race with subraces is selected", () => {
    render(
      <RaceStep
        raceId="elf"
        subraceId={null}
        onSelectRace={vi.fn()}
        onSelectSubrace={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /high elf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /wood elf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /drow/i })).toBeInTheDocument();
  });

  it("reports subrace selection", async () => {
    const onSelectSubrace = vi.fn();
    render(
      <RaceStep
        raceId="elf"
        subraceId={null}
        onSelectRace={vi.fn()}
        onSelectSubrace={onSelectSubrace}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /wood elf/i }));
    expect(onSelectSubrace).toHaveBeenCalledWith("wood-elf");
  });
});
