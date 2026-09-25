// Shared by lint-deck.mjs (Node) and the Plinth site (browser). No dependencies.
(function (root) {
  const FILLER = [
    'revolutioni[sz](?:e|es|ed|ing)', 'revolutionary', 'game[- ]chang(?:er|ing)', 'seamless(?:ly)?', 'cutting[- ]edge',
    'state[- ]of[- ]the[- ]art', 'next[- ]gen(?:eration)?', 'unlock(?:s|ing)?', 'unleash(?:es|ing)?',
    'empower(?:s|ing|ment)?', 'leverag(?:e|es|ing)', 'harness(?:es|ing)?', 'elevat(?:e|es|ing)', 'delv(?:e|es|ing)',
    'robust', 'holistic', 'synerg(?:y|ies)', 'paradigm', 'innovat(?:ive|ion)', 'world[- ]class', 'best[- ]in[- ]class',
    'transformative', 'supercharg(?:e|es|ing)', 'streamlin(?:e|es|ed|ing)', 'effortless(?:ly)?',
    "in today's fast[- ]paced world", "it's worth noting", 'furthermore', 'moreover', 'in conclusion',
    'at the end of the day', 'the future of \\w+', 'not just [\\w ]{1,30}? but',
    'merevolusi\\w*', 'revolusioner', 'mutakhir', 'memberdayakan', 'inovatif', 'solusi terdepan',
    'di era digital ini', 'tidak hanya [\\w ]{1,30}? tetapi juga', 'sinergi', 'holistik'
  ];
  const FILLER_RE = new RegExp('\\b(' + FILLER.join('|') + ')\\b', 'gi');
  const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/gu;
  const TOPIC_HEADLINES = /^(the )?(problem|solution|our solution|why us|market|team|traction|agenda|overview|introduction|thank you|questions\??|q&a|masalah|solusi|tim|pasar)$/i;

  function lintSlides(slides) {
    // slides: [{ headline, body }]
    const issues = [];
    const add = (slide, kind, msg, cost) => issues.push({ slide, kind, msg, cost });
    slides.forEach((s, i) => {
      const n = i + 1, h = (s.headline || '').trim(), b = (s.body || '').trim(), all = h + ' ' + b;
      const hw = h ? h.split(/\s+/).length : 0, bw = b ? b.split(/\s+/).length : 0;
      if (!h) add(n, 'headline', 'No headline. Every slide needs one claim.', 8);
      else if (TOPIC_HEADLINES.test(h.replace(/[.:]$/, ''))) add(n, 'headline', `"${h}" is a topic label, not a claim. Put it in the eyebrow and write what is true.`, 6);
      if (hw > 12) add(n, 'headline', `Headline has ${hw} words. Keep it to 12 or split the slide.`, 3);
      if (bw > 40) add(n, 'density', `${bw} words of body text. Aim for under 40; move the rest to speaker notes.`, 4);
      const bullets = (b.match(/(^|\n)\s*[-*•]/g) || []).length;
      if (bullets > 3) add(n, 'density', `${bullets} bullets. Three at most.`, 3);
      for (const m of all.matchAll(FILLER_RE)) add(n, 'voice', `"${m[0]}" is filler. Say the fact behind it.`, 4);
      if (EMOJI_RE.test(all)) add(n, 'voice', 'Emoji on a slide.', 3);
      EMOJI_RE.lastIndex = 0;
      if (/!/.test(all)) add(n, 'voice', 'Exclamation mark. Let the claim carry the weight.', 2);
      const nums = all.match(/(\$|Rp|USD|IDR)?\s?\d[\d.,]*\s?(%|x|k|m|b|bn|juta|miliar|triliun)?/gi) || [];
      const hasBigNum = nums.some(x => /%|x|k|m|b|\$|Rp|juta|miliar|triliun/i.test(x) || x.replace(/\D/g, '').length >= 3);
      if (hasBigNum && !s.source && !/source|sumber|\[source needed\]/i.test(all)) add(n, 'evidence', 'Number with no source line.', 3);
    });
    const cost = issues.reduce((a, x) => a + x.cost, 0);
    const score = Math.max(0, Math.round(100 - cost * (10 / Math.max(slides.length, 5))));
    return { score, issues, slides: slides.length };
  }

  // Parse plain text: slides separated by a line of --- ; first line = headline; "source:" line = source.
  function parseText(text) {
    return text.split(/\n\s*---+\s*\n/).map(chunk => {
      const lines = chunk.trim().split('\n');
      const headline = (lines.shift() || '').replace(/^#+\s*/, '');
      const src = lines.findIndex(l => /^\s*(source|sumber)\s*:/i.test(l));
      const source = src >= 0 ? lines.splice(src, 1)[0] : '';
      return { headline, body: lines.join('\n'), source };
    }).filter(s => s.headline || s.body);
  }

  const api = { lintSlides, parseText, FILLER };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PlinthLint = api;
})(typeof self !== 'undefined' ? self : this);
