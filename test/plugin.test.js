// dsh-chinese-thinking — plugin contract tests (node --test).
//
// Two axes, per the port playbook:
//  1. The ported CONTENT itself is tested (not only the new adapter shell):
//     CHINESE_THINKING_TEXT must carry the verbatim upstream markers — a
//     truncation or rewording of the copied content fails here.
//  2. The adapter is tested with a NON-identity stub: the fake ctx records
//     exactly what apply() passes to systemPrompt.section, so wiring the
//     config value into the registration is observable (a stub that returns
//     the input would let a miswired plugin pass).
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { name, inject, Config, apply, CHINESE_THINKING_TEXT } from '../index.js';

function makeCtx() {
  const sections = [];
  const ctx = {
    systemPrompt: {
      section(entry) {
        sections.push(entry);
      },
    },
    logger: { info() {} },
  };
  return { ctx, sections };
}

test('exports the Cordis namespace entry contract', async () => {
  assert.equal(name, 'dsh-chinese-thinking');
  assert.ok(Array.isArray(inject));
  assert.ok(inject.includes('systemPrompt'));
  assert.equal(typeof apply, 'function');
  // No `export default` — the loader's unwrapExports drops `inject` on default exports.
  const ns = await import('../index.js');
  assert.equal(Object.hasOwn(ns, 'default'), false);
});

test('Config schema carries the upstream default text', () => {
  const value = Config();
  assert.equal(value.enabled, true);
  assert.equal(value.order, 60);
  assert.equal(value.text, CHINESE_THINKING_TEXT);
});

test('apply registers one systemPrompt section carrying the config text', () => {
  const { ctx, sections } = makeCtx();
  apply(ctx, { enabled: true, order: 42, text: '自定义文本' });
  assert.equal(sections.length, 1);
  assert.equal(sections[0].name, 'chinese-thinking');
  assert.equal(sections[0].order, 42);
  // The exact configured text must reach the registration — a plugin that
  // ignores the config and hardcodes its own text fails this assertion.
  assert.equal(sections[0].text, '自定义文本');
});

test('apply defaults to CHINESE_THINKING_TEXT and order 60', () => {
  const { ctx, sections } = makeCtx();
  apply(ctx, {});
  assert.equal(sections.length, 1);
  assert.equal(sections[0].order, 60);
  assert.equal(sections[0].text, CHINESE_THINKING_TEXT);
});

test('apply registers nothing when disabled', () => {
  const { ctx, sections } = makeCtx();
  apply(ctx, { enabled: false });
  assert.equal(sections.length, 0);
});

test('CHINESE_THINKING_TEXT carries the verbatim upstream content (ported content, not shell)', () => {
  // Every marker below is a line copied byte-for-byte from superpowers-zh
  // v1.7.10 skill bodies (sources pinned in THIRD_PARTY_NOTICES.md). If any
  // marker is missing, the copied content was truncated or rewritten.
  const markers = [
    // using-superpowers routing (the Chinese-first default rule)
    '用户用中文交流 → 所有输出使用中文，优先考虑中国特色技能',
    // chinese-documentation 排版规范
    '**核心原则：** 排版服务于阅读体验，规范服务于一致性，内容服务于读者。',
    '使用 Git 进行版本管理，配合 Jenkins 实现持续集成。',
    '本次更新包含 3 个新功能和 12 个 Bug 修复。',
    '今天气温 32°C，CPU 使用率 95%。',
    '注意：该接口需要鉴权，请先获取 Token。',
    '「确定」按钮触发表单提交，「取消」按钮关闭弹窗。',
    '支持最多 100 个并发连接。',
    // 术语处理
    '- 没有公认中文翻译的术语：debounce、throttle、middleware',
    '使用死信队列（Dead Letter Queue）处理消费失败的消息。',
    '在 Controller 层做参数校验，Service 层处理业务逻辑。',
    // chinese-code-review 沟通风格
    '**核心原则：** 用"建议"代替"命令"，用"提问"代替"否定"，但绝不因为面子而放过 bug。',
    '- **TODO / FIXME** — 用中文描述待办事项，方便搜索和追踪',
    // chinese-commit-conventions
    '- type 保留英文关键字（工具链兼容性好）',
    '- scope 和 description 使用中文',
    '- body 使用中文完整描述',
    // chinese-git-workflow
    '**核心原则：** 工作流服务于团队效率，不是为了流程而流程。选适合团队规模的，别硬套大厂方案。',
  ];
  for (const marker of markers) {
    assert.ok(
      CHINESE_THINKING_TEXT.includes(marker),
      `missing verbatim upstream line: ${marker}`,
    );
  }
  // The section text is a real preset, not a stub.
  assert.ok(CHINESE_THINKING_TEXT.length > 500);
});
