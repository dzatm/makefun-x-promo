// post-x-promote-make-your-own-bounty-01 entry (Node 22, standard library only).
// The entry is the X post itself; this program only hands its address to the gate:
// it reads POST.json from the repository root, checks the address is an X post URL,
// and writes it to /output/POST.json. Outside the grader, MAKEFUN_BOT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_URL = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+$/;

const raw = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
const post = JSON.parse(raw) as { url?: unknown };
// The placeholder id is not digits, so an unfilled POST.json is refused here
// before the gate ever sees it.
if (typeof post.url !== 'string' || !POST_URL.test(post.url)) {
  console.error('POST.json does not name an X post URL (https://x.com/<handle>/status/<id>)');
  process.exit(1);
}
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'POST.json'), JSON.stringify({ url: post.url }, null, 2) + '\n');
console.log(`POST.json written for ${post.url}`);
