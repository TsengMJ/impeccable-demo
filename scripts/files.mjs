import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

export const hash = content => createHash('sha256').update(content).digest('hex');
export async function inventory(directory, prefix = '') {
  const result = {};
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const name = join(prefix, entry.name);
    if (entry.isDirectory()) Object.assign(result, await inventory(join(directory, entry.name), name));
    else if (entry.isFile()) result[name] = hash(await readFile(join(directory, entry.name)));
  }
  return result;
}
