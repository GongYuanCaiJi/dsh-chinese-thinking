// dsh-chinese-thinking — 中文思考预设 (Chinese Thinking default)
//
// A DeepSeek Harness plugin that makes the agent think and answer in Chinese
// by default. Ported from superpowers-zh v1.7.10 (jnMetaCode/superpowers-zh,
// MIT). The prompt text is copied VERBATIM from the upstream skill bodies —
// see prompt.js for the source attribution of every block, and
// THIRD_PARTY_NOTICES.md for the pinned upstream integrity and SHA-256 hashes
// that make the verbatim claim self-verifiable.
//
// Design: exactly ONE ctx.systemPrompt section — no tools, no events. The
// section text is the plugin's Config default, so a user can override it in
// their own cordis.patch.yml layer (a patch replaces a row's entire config
// wholesale).
//
// Exports are the Cordis "namespace" entry contract — no `export default`
// (the loader's unwrapExports drops `inject` if we use one).
import z from '@deepseek-ai/schemastery';
import { CHINESE_THINKING_TEXT } from './prompt.js';

export { CHINESE_THINKING_TEXT };

export const name = 'dsh-chinese-thinking';

export const inject = ['systemPrompt'];

export const Config = z.object({
  enabled: z.boolean().default(true),
  // Order band: -100 harness identity, 0 persona, 100–199 tool guidance.
  // 60 sits right after the persona, before tool guidance.
  order: z.number().default(60),
  text: z.string().default(CHINESE_THINKING_TEXT),
});

export function apply(ctx, config = {}) {
  const { enabled = true, order = 60, text = CHINESE_THINKING_TEXT } = config;
  if (!enabled) return;

  ctx.systemPrompt.section({
    name: 'chinese-thinking',
    order,
    text,
  });

  ctx.logger?.info?.(
    `[${name}] loaded: chinese-thinking section at order ${order} (${text.length} chars)`,
  );
}
