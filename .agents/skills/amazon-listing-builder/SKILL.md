---
name: amazon-listing-builder
description: 基于已确认的产品事实、证据库、问题库和关键词地图生成 Amazon Listing 多版本草稿。遵循先分析、再生成的流程；不在缺少事实基线或关键词地图时凭空补卖点。
---

# Amazon Listing Builder

仅在存在 `product_facts.md`、`evidence_library.md`、`keyword_library.md`、用户确认的 `keyword_review_approved.xlsx` 和 `keyword_map.md` 时生成。若关键文件缺失，指出缺口并停止，不自行重做前序分析。待审核的 `keyword_review.xlsx` 不能替代批准版本。

## 生成前

确认站点、语言、品牌、变体、用户指定长度、语气和字段要求。平台规则可能变化；用户要求最新限制时应核对官方来源，不能把 Skill 内示例当成永久规则。

## 内容结构

1. 标题：输出 3 个结构不同的版本，并说明核心取舍。
2. Item Highlights：只写简洁亮点，不承担完整关键词覆盖。
3. 五点：依次覆盖核心价值、主要痛点/方案、使用场景、规格与适配、证据/使用注意；可按产品调整顺序。
4. Description/A+：采用痛点→场景→方案→细节→对比→注意的叙事框架；模块数量按素材与页面需求决定，不虚构七屏内容。
5. Search Terms：仅用批准候选，按当前策略去重并报告字符/字节统计方式。
6. QA：回答真实问题，主动写清容量、安装、材质或兼容性的条件。

## 约束

- 不复制竞品句子。
- 不使用 `Rejected` 或未解决的 `Needs confirmation` 词。
- `Conditional` 声明必须保留限定条件。
- 不创造认证、测试、保修、环保、安全、医疗、性能或绝对化承诺。
- 英文文案优先自然、准确和易读；关键词覆盖服从事实与语法。

## 输出

生成：

- `question_library.md`
- `drafts_comparison.md`
- `listing_package.md`

在 `listing_package.md` 附关键词覆盖表和所有未使用 A/B 级词及原因。生成后交给 `amazon-listing-auditor`，不要自称已通过最终审核。
