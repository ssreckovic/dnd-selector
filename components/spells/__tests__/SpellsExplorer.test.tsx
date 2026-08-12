import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpellsExplorer } from "@/components/spells/SpellsExplorer";

const replaceMock = vi.fn();
let currentSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  useSearchParams: () => currentSearchParams,
}));

describe("SpellsExplorer", () => {
  beforeEach(() => {
    replaceMock.mockClear();
    currentSearchParams = new URLSearchParams();
  });

  it("renders all 8 caster classes in the picker", () => {
    render(<SpellsExplorer />);
    expect(screen.getByRole("button", { name: /^wizard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^paladin/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^fighter/i })).not.toBeInTheDocument();
  });

  it("navigates to the selected class's query param when a picker button is clicked", async () => {
    render(<SpellsExplorer />);
    await userEvent.click(screen.getByRole("button", { name: /^wizard/i }));
    expect(replaceMock).toHaveBeenCalledWith("/spells?class=wizard");
  });

  it("shows the three level sections for a pre-selected class via the query param", () => {
    currentSearchParams = new URLSearchParams({ class: "wizard" });
    render(<SpellsExplorer />);
    expect(screen.getByText(/wizard spells/i)).toBeInTheDocument();
    expect(screen.getByText(/^Cantrips/, { selector: "summary" })).toBeInTheDocument();
    expect(screen.getByText(/^Level 1/, { selector: "summary" })).toBeInTheDocument();
    expect(screen.getByText(/^Level 2/, { selector: "summary" })).toBeInTheDocument();
    expect(screen.getByText("Fire Bolt")).toBeInTheDocument();
  });

  it("shows 'None yet at this level' for paladin's empty cantrip list", () => {
    currentSearchParams = new URLSearchParams({ class: "paladin" });
    render(<SpellsExplorer />);
    expect(screen.getByText(/none yet at this level/i)).toBeInTheDocument();
  });
});
