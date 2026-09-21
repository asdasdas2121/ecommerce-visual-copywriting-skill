---
name: amazon-keyword-fit-checker
description: 对照 Amazon 产品事实与证据，逐项判断关键词和卖点可用、条件可用、禁用或待确认，并说明原因。适用于清洗后的关键词表；不负责按搜索量排序或写 Listing。
---

# Amazon Keyword Fit Checker

以 `product_facts.md` 和 `evidence_library.md` 为事实源，逐项检查 `keyword_candidates_normalized.csv`。竞品常用不能替代产品证据。

## 状态

- `Allowed`：产品事实直接支持，表达不会造成误导。
- `Conditional`：需带限定语、适用范围或客观条件。
- `Rejected`：产品不具备、属于他牌/型号、明显误导或无权使用。
- `Needs confirmation`：事实库没有足够信息。

## 判断要求

记录关键词实际暗含的承诺。例如 `heavy duty` 暗含承重/耐久证据，`waterproof` 暗含明确性能，`12 pairs` 可能取决于鞋码，`adjustable shelves` 必须有可调结构。不要仅按字面包含关系判断。

每行输出：

`Keyword / Implied claim / Status / Fact or evidence / Reason / Safe wording / Conditions / Risk note`

无法确认时不得自行补全产品能力。遇到站点规则或法律合规问题，只标记需要专项核对，不凭记忆宣称绝对合规。

## 输出

生成 `keyword_fit_matrix.md`，并列出：

- 可直接使用词
- 必须限定表达的词
- 待用户确认问题
- 禁用词及原因

不要决定 Title/Bullet/Search Terms 的位置。
