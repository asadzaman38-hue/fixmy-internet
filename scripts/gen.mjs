import fs from "fs";
import path from "path";

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENROUTER_API_KEY");
  process.exit(1);
}

const OUT_DIR = "content/internet/att/bgw320";
fs.mkdirSync(OUT_DIR, { recursive: true });

const kwFile = "scripts/keywords.txt";
const DONE_FILE = "scripts/done.txt";

if (!fs.existsSync(DONE_FILE)) {
  fs.writeFileSync(DONE_FILE, "");
}

const keywords = fs.readFileSync(kwFile, "utf8")
  .split("\n")
  .map(s => s.trim())
  .filter(Boolean);

const done = fs.readFileSync(DONE_FILE, "utf8")
  .split("\n")
  .map(s => s.trim())
  .filter(Boolean);

// only unused keywords
const list = keywords.filter(k => !done.includes(k));

if (list.length === 0) {
  console.log("All keywords completed. Nothing to generate.");
  process.exit(0);
}

const slugify = (s) => s.toLowerCase()
  .replace(/&/g, "and")
  .replace(/[’']/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "")
  .slice(0, 90);

async function callOR(prompt) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://fixmy-internet.netlify.app/",
      "X-Title": "FixMyInternet"
    },
    body: JSON.stringify({
      model: "poolside/laguna-xs.2:free",
      messages: [
        {
          role: "system",
          content: "You write detailed US ISP troubleshooting guides for AT&T BGW320. Use 900–1300 words, clear steps, headings, and FAQs."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4
    })
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

function promptFor(kw) {
  return `
Write a detailed SEO troubleshooting article for: "${kw}"

Requirements:
- 900–1300 words
- US English
- Add "Quick Answer" at top (2–3 lines)
- Sections:
  1. Symptoms
  2. Causes
  3. Step-by-step Fixes
  4. Advanced Fixes (DNS, reset, gateway 192.168.1.254)
  5. Common Mistakes
  6. FAQ (5 questions)
- End with "Related Guides" linking to /internet/att/bgw320/
- No fluff, only real troubleshooting steps
`;
}

for (const kw of list) {

  console.log("Generating:", kw);

  const slug = slugify(kw);
  const file = path.join(OUT_DIR, `${slug}.md`);

  const md = await callOR(promptFor(kw));

  const frontMatter = `---
title: "${kw}"
date: "${new Date().toISOString()}"
description: "Step-by-step troubleshooting guide for ${kw} on AT&T BGW320 router."
tags: ["AT&T","BGW320","Internet","Fix"]
draft: false
---
`;

  const finalContent = frontMatter + md.trim() + "\n";

  fs.writeFileSync(file, finalContent, "utf8");

  console.log("Saved:", file);

  // mark keyword as done
  fs.appendFileSync(DONE_FILE, kw + "\n");
}
