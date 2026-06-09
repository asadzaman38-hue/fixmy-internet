import fs from "fs";
import path from "path";

const key = process.env.OPENROUTER_API_KEY;
if (!key) throw new Error("Missing OPENROUTER_API_KEY");

const keyword = process.argv.slice(2).join(" ").trim();
if (!keyword) throw new Error('Usage: node scripts/gen.js "keyword here"');

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-\$)/g, "")
    .slice(0, 90);
}

const slug = slugify(keyword);
const date = new Date().toISOString().slice(0, 10);

const prompt = `
Write an accurate troubleshooting guide for USA readers about:
"\${keyword}"

Context: AT&T BGW320 gateway.

Include:
- Symptoms
- Quick checks (2 minutes)
- Step-by-step fixes (numbered, priority order)
- Advanced fixes
- When to contact AT&T
- FAQs

Add natural internal links to:
- /internet/att/
- /internet/att/bgw320/

No fake citations. No "I tested".
`;

const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer \${key}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://fixmyinternet.netlify.app",
    "X-Title": "FixMyInternet"
  },
  body: JSON.stringify({
    model: "google/gemma-2-9b-it:free",
    messages: [
      { role: "system", content: "You write clear, safe, step-by-step troubleshooting guides." },
      { role: "user", content: prompt }
    ],
    temperature: 0.4
  })
});

const json = await res.json();
const text = json?.choices?.?.message?.content;

if (!text) {
  console.error("OpenRouter response:", JSON.stringify(json, null, 2));
  process.exit(1);
}

const md = `---
title: "\${keyword}"
date: \${date}
description: "Step-by-step fixes for: \${keyword} (AT&T BGW320)."
---

\${text}
`;

const outDir = "content/internet/att/bgw320";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `\${slug}.md`);
fs.writeFileSync(outPath, md);
console.log("Wrote:", outPath);
