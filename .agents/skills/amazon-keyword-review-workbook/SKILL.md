---
name: amazon-keyword-review-workbook
description: 把已完成适配、分类和优先级评分的 Amazon 关键词整理成可下载、可人工修改的 Excel 审核表，并在用户确认前阻止进入关键词映射和 Listing 生成。
---

# Amazon Keyword Review Workbook

这是关键词流程的强制人工审核关卡。读取已评分的 `keyword_library.md`、`keyword_priority_report.md`、`keyword_fit_matrix.md` 和产品事实，生成 `keyword_review.xlsx`。

## 生成时机

在关键词优先级评分完成后生成，位于 `amazon-keyword-prioritizer` 与 `amazon-keyword-mapper` 之间。工作簿交给用户后暂停，不得因用户沉默而视为批准。

## 工作簿结构

使用电子表格工具创建，至少包含两个工作表：

1. `Keyword Review`：人工审核主表。
2. `Product Facts`：本轮判断所依据的产品事实、明确不存在的功能和证据状态。

主表每个规范化关键词一行，至少包含：

`ID, Keyword, Original variants, Concept group, Primary class, Secondary classes, Competitor IDs, Competitor count, Occurrence count, Source positions, AI fit, AI reason, Evidence or conditions, Relevance score, Intent score, AI priority, AI suggested placement, Human decision, Human class, Human priority, Human placement, Human notes, Final decision`

## 人工可编辑列

使用浅黄色填充并提供下拉选项：

- `Human decision`：`Accept / Conditional / Reject / Needs review`
- `Human class`：`Core / Feature / Scenario / Problem / Specification / Audience-Object / Semantic`
- `Human priority`：`A / B / C / Hold`
- `Human placement`：`Title / Highlights / Bullets / Description-A+ / Search Terms / QA / Do not use`
- `Human notes`：自由填写

AI 原始判断列必须保留，不允许用户修改后覆盖 AI 判断。`Final decision` 优先读取人工判断；没有人工判断时显示 `Pending human review`，不能回退到 AI 判断并假装已批准。

## 可读性

- 冻结标题行和关键词列。
- 开启筛选。
- 用条件格式区分 AI 的 Allowed、Conditional、Rejected、Needs confirmation。
- 用另一套条件格式标记人工 Reject、Needs review 和仍未审核的行。
- 保留竞品来源、出现位置和判断理由，方便用户回查。
- 不把竞品覆盖次数或网页结果数命名为 Search Volume。

## 审核完成条件

只有以下条件全部满足，才生成 `keyword_review_approved.xlsx` 或继续下一阶段：

1. 所有 A/B 级词都有 `Human decision`。
2. 所有 `Conditional` 词都有条件说明或被人工拒绝。
3. 所有 `Needs review`、`Needs confirmation` 均已解决或降为 Hold。
4. 用户明确表示审核完成。

用户上传审核后的工作簿时，读取人工列，保留 AI 列，并生成变更摘要：接受、条件使用、拒绝、改分类、改优先级、改位置。不要覆盖用户的备注。

## 输出

- `keyword_review.xlsx`：待人工审核版本。
- `keyword_review_summary.md`：数量、待确认项和重点冲突。
- 审核完成后才输出 `keyword_review_approved.xlsx`。

若需要从结构化 JSON 生成工作簿，可使用 `scripts/build_review_workbook.mjs`。输入为包含 `productName`、`facts` 和 `keywords` 数组的 JSON。
