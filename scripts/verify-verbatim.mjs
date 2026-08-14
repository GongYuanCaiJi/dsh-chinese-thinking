// Line-level verbatim reconciliation for the ported prompt text.
//
// Evaluates prompt.js and compares every line of the exported
// CHINESE_THINKING_TEXT value against the five upstream skill files pinned in
// THIRD_PARTY_NOTICES.md (each file's SHA-256 verified against the registry
// tarball superpowers-zh@1.7.10). Expected outcome:
//
//   CHINESE_THINKING_TEXT: 187 lines
//     byte-identical to upstream: 179
//     port-authored (declared):   8
//
// Exit code 0 only when all checks pass. Run from the repo root:
//
//   node scripts/verify-verbatim.mjs
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const VERSION = '1.7.10';

// Must match the "Verbatim source files" table in THIRD_PARTY_NOTICES.md.
const PINNED = {
  'using-superpowers/SKILL.md': '3da2066e0fe0fe0022f48cc6363b8f0dab1cca5c0ba77d8a387505d0d48ff9ed',
  'chinese-documentation/SKILL.md': '58323397177b6343bd3234f9e4acd8891d58f08cf8076b26fd98296308203a0a',
  'chinese-code-review/SKILL.md': '51326bc6e097ff69251b36335c31c768ba0dc8ca8204d2c81b8a4826ffab0682',
  'chinese-commit-conventions/SKILL.md': '64dad78d77bb872394322f79b580078eea1739bed01111894ffffbfdec492e4f',
  'chinese-git-workflow/SKILL.md': 'e428dc6f0c3883941e15598db5f5d9ec066a3d3528cbbd565d98273aad900aa1',
};

// The plugin's own lines (declared in THIRD_PARTY_NOTICES.md): the title, the
// opening directive, and the six section-title lines.
const PORT_AUTHORED = [
  '# 中文思考（Chinese Thinking）',
  '你是面向中文用户的编程助手。默认用中文思考，用中文输出。用户没有明确指定语言时，一律使用中文；代码、命令、专有名词与标准术语保留英文原文。',
  '## 中文场景识别（来自 using-superpowers 的中国特色技能路由）',
  '## 中文排版规范（来自 chinese-documentation/SKILL.md）',
  '## 中英混排最佳实践（来自 chinese-documentation/SKILL.md）',
  '## 代码注释语言（来自 chinese-code-review/SKILL.md）',
  '## 中文提交规范（来自 chinese-commit-conventions/SKILL.md）',
  '## 国内 Git 工作流（来自 chinese-git-workflow/SKILL.md）',
];

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const work = mkdtempSync(join(tmpdir(), 'verify-verbatim-'));

try {
  execSync(`npm pack superpowers-zh@${VERSION} --pack-destination "${work}"`, { stdio: 'pipe' });
  execSync(`tar xzf "${join(work, `superpowers-zh-${VERSION}.tgz`)}" -C "${work}"`, { stdio: 'pipe' });
  const skillDir = join(work, 'package', 'skills');

  // 1. Every pinned file must match its SHA-256.
  for (const [rel, hash] of Object.entries(PINNED)) {
    const path = join(skillDir, rel);
    if (!existsSync(path)) throw new Error(`missing ${rel}`);
    const actual = createHash('sha256').update(readFileSync(path)).digest('hex');
    if (actual !== hash) throw new Error(`SHA-256 mismatch for ${rel}: ${actual}`);
  }

  // 2. Evaluate the plugin's exported text.
  const mod = await import(new URL('../prompt.js', import.meta.url));
  const lines = mod.CHINESE_THINKING_TEXT.split('\n');

  // 3. Reconcile every line against the union of upstream lines.
  const upstream = new Set();
  for (const rel of Object.keys(PINNED)) {
    for (const line of readFileSync(join(skillDir, rel), 'utf8').split('\n')) upstream.add(line);
  }
  const unmatched = lines.filter((line) => !upstream.has(line));
  const undeclared = unmatched.filter((line) => !PORT_AUTHORED.includes(line));
  const missing = PORT_AUTHORED.filter((line) => !lines.includes(line));
  const verbatim = lines.length - unmatched.length;

  console.log(`superpowers-zh@${VERSION} pinned files: 5/5 SHA-256 OK`);
  console.log(`CHINESE_THINKING_TEXT: ${lines.length} lines`);
  console.log(`  byte-identical to upstream: ${verbatim}`);
  console.log(`  port-authored (declared):   ${unmatched.length}`);
  if (undeclared.length) {
    console.log('  UNDECLARED non-verbatim lines:');
    for (const line of undeclared) console.log(`    ${JSON.stringify(line)}`);
  }
  if (missing.length) {
    console.log('  Declared port-authored lines missing from the text:');
    for (const line of missing) console.log(`    ${JSON.stringify(line)}`);
  }

  const ok =
    verbatim + unmatched.length === lines.length &&
    undeclared.length === 0 &&
    missing.length === 0;
  console.log(
    ok
      ? `PASS: ${lines.length} = ${verbatim} verbatim + ${unmatched.length} declared port-authored`
      : 'FAIL',
  );
  process.exitCode = ok ? 0 : 1;
} finally {
  rmSync(work, { recursive: true, force: true });
}
