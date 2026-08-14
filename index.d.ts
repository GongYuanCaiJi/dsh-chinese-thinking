// Type declarations for dsh-chinese-thinking (hand-written; the plugin is
// plain ESM JavaScript). The shapes below are exactly what index.js exports
// and what apply() consumes from the dsh context — nothing more is claimed.
//
// Note: schemastery does not export its `Schema` type by name, so `Config`
// is declared structurally as a callable that returns the defaults-applied
// config object (which is how the Cordis loader and the tests use it).

export interface ChineseThinkingConfig {
  enabled: boolean;
  order: number;
  text: string;
}

export interface SystemPromptSectionInput {
  name: string;
  order: number;
  text: string;
}

/** The subset of the dsh plugin context that apply() touches. */
export interface PluginContext {
  systemPrompt: {
    section(entry: SystemPromptSectionInput): unknown;
  };
  logger?: {
    info?(message: string): unknown;
  };
}

/** schemastery object schema; `Config()` returns defaults applied. */
export declare const Config: {
  (config?: Partial<ChineseThinkingConfig>): ChineseThinkingConfig;
};

export declare const name: string;

export declare const inject: readonly string[];

export declare const CHINESE_THINKING_TEXT: string;

export declare function apply(
  ctx: PluginContext,
  config?: Partial<ChineseThinkingConfig>,
): void;
