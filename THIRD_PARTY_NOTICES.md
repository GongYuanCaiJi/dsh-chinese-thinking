# Third-Party Notices

`dsh-chinese-thinking` is a port of content from
[**superpowers-zh**](https://github.com/jnMetaCode/superpowers-zh) (MIT),
distributed on npm as `superpowers-zh`.

## Upstream package (pinned)

| Field | Value |
|---|---|
| Package | `superpowers-zh` |
| Version | **1.7.10** (pinned; registry `time.modified` 2026-08-12T11:07:24.991Z) |
| Repository | `git+https://github.com/jnMetaCode/superpowers-zh.git` |
| License | MIT |
| npm tarball `dist.integrity` | `sha512-ljI1CMQm1t4Snu2viy6iQVz8SKKKjhDG0p2hrXLts+TCRrL4mETalI7xig+qfM45bz6RL9KNq4CS9HLO8heX6g==` |
| npm tarball `dist.shasum` | `5eb94074766c6e90d74dc81f334f115a03584e1e` |
| `gitHead` | `d83d3f9dc20218e576df09df7c68cfea62df7353` |
| Tarball SHA-256 (this machine, `npm pack superpowers-zh@1.7.10`) | `02126d1174ab717be34a95b77b6a6c848a19e3de544dcfd1a79564cb01e4b970` |

## Verbatim source files

`prompt.js` copies content verbatim from these files inside the pinned
tarball. Each file's SHA-256 is pinned so the "verbatim" claim is
self-verifiable:

| File (inside `superpowers-zh-1.7.10.tgz`) | SHA-256 |
|---|---|
| `package/skills/using-superpowers/SKILL.md` | `3da2066e0fe0fe0022f48cc6363b8f0dab1cca5c0ba77d8a387505d0d48ff9ed` |
| `package/skills/chinese-documentation/SKILL.md` | `58323397177b6343bd3234f9e4acd8891d58f08cf8076b26fd98296308203a0a` |
| `package/skills/chinese-code-review/SKILL.md` | `51326bc6e097ff69251b36335c31c768ba0dc8ca8204d2c81b8a4826ffab0682` |
| `package/skills/chinese-commit-conventions/SKILL.md` | `64dad78d77bb872394322f79b580078eea1739bed01111894ffffbfdec492e4f` |
| `package/skills/chinese-git-workflow/SKILL.md` | `e428dc6f0c3883941e15598db5f5d9ec066a3d3528cbbd565d98273aad900aa1` |

### Self-verify

```bash
npm pack superpowers-zh@1.7.10
shasum -a 256 superpowers-zh-1.7.10.tgz
# expect: 02126d1174ab717be34a95b77b6a6c848a19e3de544dcfd1a79564cb01e4b970

tar xzf superpowers-zh-1.7.10.tgz
shasum -a 256 package/skills/using-superpowers/SKILL.md \
        package/skills/chinese-documentation/SKILL.md \
        package/skills/chinese-code-review/SKILL.md \
        package/skills/chinese-commit-conventions/SKILL.md \
        package/skills/chinese-git-workflow/SKILL.md
# compare each against the table above
```

## What was copied and how

- **Verbatim:** every content line of `CHINESE_THINKING_TEXT` in `prompt.js`
  (section bodies, rules, examples) is byte-identical to a line in the five
  files above. The only systematic formatting change: upstream's markdown
  code fences (```` ``` ````) are removed, because the text renders as a
  system-prompt section.
- **Port-authored (not upstream):** the section title lines and the opening
  directive "默认用中文思考，用中文输出" — the plugin's own claim, grounded in
  the upstream routing rule "用户用中文交流 → 所有输出使用中文，优先考虑中国
  特色技能" (using-superpowers/SKILL.md:88).
- **Not copied:** the rest of the upstream package (its installer, hooks,
  other skills, README). The port ships only the 中文思考预设 surface: one
  `ctx.systemPrompt` section, no tools, no events.

## License

The upstream and this port are both MIT. See `LICENSE`.
