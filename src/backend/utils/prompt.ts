'use server';

import fs from 'fs';
import path from 'path';

type Prompt = 'Base' | 'Summary';

export function getPrompt(name: Prompt) {
  return fs.readFileSync(path.join(process.cwd(), 'src/docs/prompt', `${name}.md`), 'utf-8');
}
