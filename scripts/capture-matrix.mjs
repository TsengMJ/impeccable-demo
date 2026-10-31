import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cases } from './cases.mjs';

const keys = Object.keys(cases);
const variants = ['a', 'b', 'c', 'd', 'e'];
const views = ['desktop', 'mobile'];
const jobs = keys.flatMap(key => variants.flatMap(variant => views.map(view => ({ key, variant, view, motion: 'reduce' }))));
// A and E need a second, motion-enabled desktop take to show what animate changes.
jobs.push(...keys.flatMap(key => ['a', 'e'].map(variant => ({ key, variant, view: 'desktop', motion: 'no-preference' }))));
const parallel = Math.max(1, Math.min(4, Number(process.env.CAPTURE_PARALLEL || 3)));
const records = [];
let next = 0;

function capture(job) {
  return new Promise(resolveJob => {
    const args = ['scripts/capture.mjs', '--case', job.key, '--take', job.variant, '--viewport', job.view, '--motion', job.motion];
    const child = spawn(process.execPath, args, { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = '';
    child.stdout.on('data', chunk => { out += chunk; });
    child.stderr.on('data', chunk => { err += chunk; });
    child.on('close', code => resolveJob({ ...job, code, directory: code === 0 ? out.trim().split('\n').at(-1) : null, stderr: err.trim() }));
  });
}

async function worker() {
  while (next < jobs.length) {
    const job = jobs[next++];
    const result = await capture(job);
    records.push(result);
    console.log(`${records.length}/${jobs.length} ${job.key}/${job.variant} ${job.view} ${job.motion}: ${result.code === 0 ? 'saved' : 'FAILED'}${result.stderr ? ` — ${result.stderr}` : ''}`);
  }
}
await Promise.all(Array.from({ length: parallel }, worker));
const manifest = { createdAt: new Date().toISOString(), count: records.length, success: records.filter(r => r.code === 0).length, parallel, records };
const output = resolve('recordings/matrix-capture-manifest.json');
await writeFile(output, JSON.stringify(manifest, null, 2) + '\n');
console.log(output);
if (manifest.success !== jobs.length) process.exitCode = 1;
