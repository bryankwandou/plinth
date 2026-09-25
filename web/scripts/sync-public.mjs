// Copies the static site assets from ../site into public/ byte for byte.
// decks/*.html are hashed on Solana devnet, so they are copied, never transformed.
// If ../site is not present (e.g. deploying web/ alone), the existing copies are kept.
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "..", "site");
const pub = join(root, "public");
const items = ["anchor.html", "decks", "receipts.json", "walkthrough.mp4", "walkthrough-poster.png", "logo.svg", "lint-core.js", "i18n.js"];

if (!existsSync(site)) {
  console.log("sync-public: ../site not found, keeping existing public/ copies");
  process.exit(0);
}
mkdirSync(pub, { recursive: true });
for (const it of items) cpSync(join(site, it), join(pub, it), { recursive: true });
console.log("sync-public: copied " + items.join(", "));
