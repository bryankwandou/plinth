// Injects examples/*.slides.html into the skill template and writes site/decks/*.html
import { readFileSync, writeFileSync, readdirSync, mkdirSync, cpSync } from 'node:fs';
const root = new URL('..', import.meta.url);
const tpl = readFileSync(new URL('skill/plinth/assets/deck-template.html', root), 'utf8');
mkdirSync(new URL('site/decks/', root), { recursive: true });
writeFileSync(new URL('site/lint-core.js', root), readFileSync(new URL('skill/plinth/scripts/lint-core.js', root)));
cpSync(new URL('examples/img/', root), new URL('site/decks/img/', root), { recursive: true });
for (const f of readdirSync(new URL('examples/', root)).filter(f => f.endsWith('.slides.html'))) {
  let src = readFileSync(new URL('examples/' + f, root), 'utf8');
  const title = (src.match(/<title>(.*?)<\/title>/) || [, 'Deck'])[1];
  src = src.replace(/<title>.*?<\/title>\s*/, '');
  const out = tpl.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<!--SLIDES-->[\s\S]*<!--\/SLIDES-->/, () => src);
  const name = f.replace('.slides.html', '.html');
  writeFileSync(new URL('site/decks/' + name, root), out);
  console.log('built site/decks/' + name);
}
