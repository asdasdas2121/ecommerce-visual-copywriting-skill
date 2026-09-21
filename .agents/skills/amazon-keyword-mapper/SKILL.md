---
name: amazon-keyword-mapper
description: 把已评分且适用的 Amazon 关键词分配到 Title、Highlights、Bullets、Description/A+、Search Terms 和 QA，并跟踪覆盖与重复。适用于写 Listing 前的关键词地图；不直接生成最终文案。
---

# Amazon Keyword Mapper

根据产品事实、词类、优先级、人工审核结果和可读性规划关键词，而不是机械塞词。

## 前置门槛

必须读取已由用户明确确认的 `keyword_review_approved.xlsx`。如果只有待审核的 `keyword_review.xlsx`，或 A/B 级词仍存在空白人工判断、Needs review、Needs confirmation，则停止并请用户先完成审核。人工决定优先于 AI 建议，但不得让人工选择绕过事实证据；发现冲突时标记并重新确认。

## 分配原则

- Title：少量最核心、最准确、最高优先级短语；遵守用户指定的品牌、字符和站点限制。
- Highlights：简短利益点与关键功能，不堆叠完整核心词。
- Bullets：覆盖决策信息、痛点、场景、规格和信任证据。
- Description/A+：解释场景、方案、细节、对比与注意事项；避免复制 Bullets。
- Search Terms：补充未充分覆盖的相关索引表达，排除品牌、ASIN、误导词和无意义重复。是否完全排除与前台重复，按用户策略与当前站点规则执行。
- QA：承接自然语言问题与条件说明。

同一概念可在必要位置重复，但要区分“合理强化”与“无价值堆砌”。不得为了零重复而牺牲语法、核心相关性或必要表达。

## 输出

生成 `keyword_map.md`，字段：

`Keyword / Concept / Priority / Primary placement / Secondary placement / Exact use / Semantic use / Already covered / Reason / Conditions`

附：

- 字段级关键词预算
- 已覆盖/未覆盖清单
- Search Terms 候选与排除原因
- 必须自然改写而非精确重复的词

不要写完整标题和五点。
