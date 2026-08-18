"use client";

type EnemyHookStepProps = {
  enemyHook: string;
  onEnemyHookChange: (value: string) => void;
};

export function EnemyHookStep({ enemyHook, onEnemyHookChange }: EnemyHookStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Made some enemies</h2>
      <p className="text-zinc-600">
        What is something your character did that put them on the wrong side of a gang/mercenary company/powerful person?
      </p>
      <label className="flex flex-col gap-1" htmlFor="enemy-hook">
        <span className="font-medium">What did your character do?</span>
        <textarea
          id="enemy-hook"
          aria-label="What did your character do?"
          className="min-h-32 rounded border border-zinc-300 px-3 py-2"
          value={enemyHook}
          onChange={(e) => onEnemyHookChange(e.target.value)}
          placeholder=''
        />
      </label>
    </div>
  );
}
