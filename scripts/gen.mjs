import fs from "fs";
import path from "path";

const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) { console.error("Missing OPENROUTER_API_KEY"); process.exit(1); }

const OUT_DIR = "content/internet/att/bgw320";
fs.mkdirSync(OUT_DIR, { recursive: true });

const kwFile = "scripts/keywords.txt";
const keywords = fs.readFileSync(kwFile, "utf8")
  .split("\n").map(s => s.trim()).filter(Boolean);
const ONE_BY_ONE = true;
const list = ONE_BY_ONE ? keywords.slice(0, 1) : keywords;

for (const kw of list){


const slugify = (s) => s.toLowerCase()
  .replace(/&/g,"and")
  .replace(/[’']/g,"")
  .replace(/[^a-z0-9]+/g,"-")
  .replace(/(^-|-\$)/g,"")
  .slice(0,90);

async function callOR(prompt){
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${API_KEY}`,
      "Content-Type":"application/json",
      "HTTP-Referer":"https://fixmy-internet.netlify.app/",
      "X-Title":"FixMyInternet"
    },
    body:JSON.stringify({
      model:"poolside/laguna-xs.2:free",
      messages:[
        {role:"system",content:"You write accurate, step-by-step troubleshooting guides for US users on AT&T BGW320. Use clear headings, ordered steps, time estimates, and safety notes. Avoid fluff, keyword stuffing, and unverifiable claims."},
        {role:"user",content:prompt}
      ],
      temperature:0.4
    })
  });

  if(!res.ok) throw new Error(`OpenRouter ${res.status}: ` + await res.text());
  const data = await res.json();
  return data.choices?.message?.content || "";
}

function promptFor(kw){
  return `Write an SEO article targeting: "\${kw}"
Requirements:
- English (US), 900–1300 words
- Add a 2–3 line "Quick answer" at top
- Sections: Symptoms checklist, Step-by-step fixes (with time estimates), Common mistakes, When to contact AT&T (what info to provide), FAQ (5)
- Include: BGW320 UI paths via 192.168.1.254 when relevant, LED light meanings if relevant, safe reset guidance
- Add a short "Related guides" list at the end linking to /internet/att/bgw320/
Output ONLY Markdown (no code fences).`;
}


  const slug = slugify(kw);
  const file = path.join(OUT_DIR, `${slug}.md`);
  if (fs.existsSync(file)) { console.log("Skip:", slug); continue; }

  console.log("Generating:", kw);
  const md = await callOR(promptFor(kw));

  const fm =
`---
title: "\${kw.replace(/"/g,'\\"')}"
date: \${new Date().toISOString()}
description: "Step-by-step troubleshooting for \${kw} on AT&T BGW320."
tags: ["AT&T","BGW320","Internet","Troubleshooting"]
---

`;
  fs.writeFileSync(file, fm + md.trim() + "\n", "utf8");
  console.log("Saved:", file);
}
