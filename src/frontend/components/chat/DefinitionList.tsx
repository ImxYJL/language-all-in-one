// components/DefinitionList.tsx
'use client';
import DefinitionItem from './DefinitionItem';

type Def = { text: string; partOfSpeech?: string };

export function DefinitionList({ defs }: { defs: Def[] }) {
  return (
    <ul className="space-y-2">
      {defs.map((d, i) => (
        <DefinitionItem key={i} def={d} />
      ))}
    </ul>
  );
}
