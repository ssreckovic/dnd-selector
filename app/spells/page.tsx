import { Suspense } from "react";
import { SpellsExplorer } from "@/components/spells/SpellsExplorer";

export default function SpellsPage() {
  return (
    <main className="mx-auto flex min-h-screen container flex-col gap-8 px-4 py-12">
      <Suspense fallback={null}>
        <SpellsExplorer />
      </Suspense>
    </main>
  );
}
