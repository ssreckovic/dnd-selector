import { Wizard } from "@/components/wizard/Wizard";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-4 py-12">
      <Wizard />
    </main>
  );
}
