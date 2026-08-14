<div align="center">

# dsh-chinese-thinking · 中文思考预设

🌐 **简体中文** | [English](#english)

**让 DeepSeek Harness 的 agent 默认用中文思考、用中文回复。**

**Makes your DeepSeek Harness agent think and answer in Chinese by default.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/dsh-chinese-thinking)](https://www.npmjs.com/package/dsh-chinese-thinking)
[![dsh-plugin](https://img.shields.io/badge/dsh-plugin-ok-green)](https://github.com/topics/dsh-plugin)

</div>

## 功能 / Features

- **默认中文**：不指定语言时，agent 用中文思考、用中文输出；代码、命令、专有名词保留英文原文
- **中文排版规范**：中英文空格、全角标点、数字与单位、括号引号 —— 逐字移植自 superpowers-zh 的 chinese-documentation
- **中英混排最佳实践**：术语保留与翻译、首次出现标注、避免过度翻译
- **代码注释语言**：何时用中文 / 何时用英文（chinese-code-review）
- **中文提交规范**：type 保留英文、scope/description/body 用中文（chinese-commit-conventions）
- **国内 Git 工作流**：核心原则（chinese-git-workflow）

## 效果 / What it does

安装后，agent 的 system prompt 会多出「中文思考」一节：你在对话里用中文，它就全程用中文想、用中文答 —— 不再「聊着聊着吐英文」。这一节是**可配置的预设**：改 `config.text` 就能换成你自己的中文思考指令。

## 安装 / Installation

```bash
dsh plugin --profile <你的 profile> add dsh-chinese-thinking
```

还没发布到 npm 时，用本地路径：

```bash
npm install   # 先装依赖（@deepseek-ai/schemastery）
dsh plugin --profile <你的 profile> add ./dsh-chinese-thinking
```

装完重启 dsh，开一段新对话即可生效。

## 配置 / Configuration

默认配置（`cordis.patch.yml` 里的 `config: {}` 走 schema 默认值）：

| 键 | 默认 | 说明 |
|---|---|---|
| `enabled` | `true` | 是否注入「中文思考」system prompt 节 |
| `order` | `60` | 节的顺序（-100 身份、0 persona、100–199 工具指引） |
| `text` | 见 `prompt.js` | 提示词正文，可整体覆盖 |

覆盖示例（写在你自己 profile 的 `cordis.patch.yml`，patch 会整体替换该行的 config）：

```yaml
- insert:
    - id: chinese-thinking
      name: 'dsh-chinese-thinking'
      config:
        enabled: true
        order: 60
        text: |
          用中文思考，用中文回复。
```

## 移植来源 / Upstream

本插件是 [**superpowers-zh**](https://github.com/jnMetaCode/superpowers-zh)（MIT，9,245 下载/月，7,663★）的移植（port）。提示词正文逐字来自其 `chinese-documentation`、`chinese-code-review`、`chinese-commit-conventions`、`chinese-git-workflow` 与 `using-superpowers` 五个 skill 正文，源文件 SHA-256 已钉在 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，可自行核验。

- 上游仓库：[jnMetaCode/superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)
- 上游 npm：[superpowers-zh](https://www.npmjs.com/package/superpowers-zh)
- 上游基线：[obra/superpowers](https://github.com/obra/superpowers)

如果你觉得有用，**请也给上游 superpowers-zh 一个 star** ⭐

## License

MIT。见 [LICENSE](LICENSE) 与 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

---

<a id="english"></a>

<div align="center">

# dsh-chinese-thinking · Chinese Thinking Default

🌐 [简体中文](#) | **English**

**Makes your DeepSeek Harness agent think and answer in Chinese by default.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/dsh-chinese-thinking)](https://www.npmjs.com/package/dsh-chinese-thinking)
[![dsh-plugin](https://img.shields.io/badge/dsh-plugin-ok-green)](https://github.com/topics/dsh-plugin)

</div>

## Features

- **Chinese by default**: when no language is specified, the agent thinks and answers in Chinese; code, commands, and proper nouns stay in English
- **Chinese typography rules**: spacing between CJK/Latin, full-width punctuation, numbers & units, brackets and quotes — verbatim from superpowers-zh's `chinese-documentation`
- **Bilingual writing best practices**: which terms to keep in English vs. translate, first-mention annotations, avoiding over-translation
- **Code comment language**: when to use Chinese vs. English (`chinese-code-review`)
- **Chinese commit conventions**: English `type`, Chinese scope/description/body (`chinese-commit-conventions`)
- **Domestic Git workflow**: core principle (`chinese-git-workflow`)

## What it does

After installation, a "Chinese Thinking" section is added to the agent's system prompt: once you chat in Chinese, the agent thinks and answers in Chinese end to end — no more drifting into English mid-conversation. The section is a **configurable preset**: override `config.text` to ship your own Chinese-thinking instructions.

## Installation

```bash
dsh plugin --profile <your-profile> add dsh-chinese-thinking
```

Not published to npm yet — use a local path:

```bash
npm install   # installs @deepseek-ai/schemastery first
dsh plugin --profile <your-profile> add ./dsh-chinese-thinking
```

Restart dsh and start a new conversation to activate.

## Configuration

Defaults (the `config: {}` in `cordis.patch.yml` resolves to schema defaults):

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Whether to inject the "Chinese Thinking" system-prompt section |
| `order` | `60` | Section order (-100 identity, 0 persona, 100–199 tool guidance) |
| `text` | see `prompt.js` | The prompt body; replace wholesale to customize |

Override example (in your profile's own `cordis.patch.yml` — a patch replaces the row's entire config):

```yaml
- insert:
    - id: chinese-thinking
      name: 'dsh-chinese-thinking'
      config:
        enabled: true
        order: 60
        text: |
          Think in Chinese, answer in Chinese.
```

## Upstream

This plugin is a **port** of [**superpowers-zh**](https://github.com/jnMetaCode/superpowers-zh) (MIT, 9,245 downloads/month, 7,663★). The prompt body is copied verbatim from its `chinese-documentation`, `chinese-code-review`, `chinese-commit-conventions`, `chinese-git-workflow`, and `using-superpowers` skill bodies; source SHA-256 hashes are pinned in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for self-verification.

- Upstream repo: [jnMetaCode/superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)
- Upstream npm: [superpowers-zh](https://www.npmjs.com/package/superpowers-zh)
- Upstream baseline: [obra/superpowers](https://github.com/obra/superpowers)

If you find this useful, **please star the upstream superpowers-zh too** ⭐

## License

MIT. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
