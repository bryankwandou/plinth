#!/usr/bin/env node
// Write a deck receipt to Solana devnet: the file's SHA-256 and its lint score, as an SPL Memo.
// Usage: node anchor.mjs deck.html [--keypair ~/.config/solana/id.json] [--rpc https://api.devnet.solana.com]
// Anyone can check it later at https://plinthdeck.vercel.app/anchor.html with the signature and the file.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const file = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1]?.startsWith('--') !== true);
if (!file) { console.error('usage: anchor.mjs <deck.html|slides.txt> [--keypair path] [--rpc url]'); process.exit(2); }
const keyPath = opt('--keypair', `${homedir()}/.config/solana/id.json`).replace(/^~/, homedir());
const rpc = opt('--rpc', 'https://api.devnet.solana.com');

let web3;
try { web3 = await import('@solana/web3.js'); }
catch { console.error('needs @solana/web3.js:  npm i @solana/web3.js@1'); process.exit(2); }

const bytes = readFileSync(file);
const sha = createHash('sha256').update(bytes).digest('hex');
const lint = fileURLToPath(new URL('./lint-deck.mjs', import.meta.url));
let r;
try { r = JSON.parse(execFileSync('node', [lint, file, '--json'], { encoding: 'utf8' })); }
catch (e) { r = JSON.parse(e.stdout); }

const memo = `plinth:v1 sha256=${sha} score=${r.score} slides=${r.slides}`;
const payer = web3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(readFileSync(keyPath, 'utf8'))));
const conn = new web3.Connection(rpc, 'confirmed');
const tx = new web3.Transaction().add(new web3.TransactionInstruction({
  programId: new web3.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
  keys: [{ pubkey: payer.publicKey, isSigner: true, isWritable: false }],
  data: Buffer.from(memo, 'utf8'),
}));
const sig = await web3.sendAndConfirmTransaction(conn, tx, [payer]);
const cluster = rpc.includes('devnet') ? '?cluster=devnet' : '';
console.log(JSON.stringify({ file, memo, signature: sig, signer: payer.publicKey.toBase58(),
  explorer: `https://explorer.solana.com/tx/${sig}${cluster}` }, null, 2));
