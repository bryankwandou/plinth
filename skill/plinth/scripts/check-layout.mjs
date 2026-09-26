#!/usr/bin/env node
// Usage: node check-layout.mjs deck.html [more.html...]
// Opens each slide in headless Chrome at 1280x720 and fails if any text or image
// runs off the slide, or if two blocks overlap. Needs puppeteer-core and Chrome.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
const puppeteer = (await import('puppeteer-core').catch(() => null))?.default;
if (!puppeteer) { console.error('npm install puppeteer-core   (once)'); process.exit(2); }
const CHROME = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(p => p && existsSync(p));
const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
let bad = 0;
for (const f of process.argv.slice(2)) {
  const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 });
  await p.goto(pathToFileURL(resolve(f)).href + '?print', { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready);
  const problems = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('section').forEach((s, n) => {
      s.classList.add('on');
      const box = s.getBoundingClientRect();
      // leaf blocks that carry visible content
      const els = [...s.querySelectorAll('h1,h2,p,li,img,svg,.big,.hbars,.tl>div,.flow>div,table,.frame,.stat')]
        .filter(e => !e.closest('aside') && e.getClientRects().length);
      for (const e of els) {
        const r = e.getBoundingClientRect();
        if (r.right > box.right - 8 || r.bottom > box.bottom - 8 || r.left < box.left + 8 || r.top < box.top + 8)
          out.push(`slide ${n + 1}: ${e.tagName.toLowerCase()} "${(e.textContent || e.alt || '').trim().slice(0, 40)}" runs off the slide`);
        if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflow !== 'visible')
          out.push(`slide ${n + 1}: ${e.tagName.toLowerCase()} text is clipped`);
      }
      const top = els.filter(e => !els.some(o => o !== e && o.contains(e)));
      for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) {
        const a = top[i].getBoundingClientRect(), c = top[j].getBoundingClientRect();
        const ox = Math.min(a.right, c.right) - Math.max(a.left, c.left), oy = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top);
        if (ox > 4 && oy > 4) out.push(`slide ${n + 1}: "${top[i].textContent.trim().slice(0, 30)}" overlaps "${top[j].textContent.trim().slice(0, 30)}"`);
      }
    });
    return out;
  });
  console.log(`${f}: ${problems.length ? problems.length + ' layout problem(s)' : 'layout OK'}`);
  for (const x of problems) console.log('  ' + x);
  bad += problems.length; await p.close();
}
await b.close();
process.exit(bad ? 1 : 0);
