---
name: amazon-listing-workflow
description: 协调人工竞品文案驱动的完整 Amazon Listing 工作流，检查阶段产物并依次路由到事实、语料、关键词、映射、生成和审核模块。适用于用户要求从原始资料一路生成完整交付包；不替代单个模块的专业判断。
---

# Amazon Listing Workflow

这是总控 Skill。一次只推进当前具备输入条件的阶段，不跳步，不把后序结果倒灌成“事实”。

## 阶段门槛

1. `amazon-product-facts` → `input_data.json`, `product_facts.md`, `evidence_library.md`
2. `amazon-competitor-corpus` → `competitor_corpus.md`
3. `amazon-keyword-extractor` → `keyword_candidates.csv`
4. `amazon-keyword-normalizer` → `keyword_candidates_normalized.csv`
5. `amazon-keyword-fit-checker` → `keyword_fit_matrix.md`
6. `amazon-keyword-classifier` → `keyword_library.md`
7. `amazon-keyword-prioritizer` → `keyword_priority_report.md` 和已评分词库
8. `amazon-keyword-review-workbook` → `keyword_review.xlsx`，暂停等待用户人工审核；确认后生成 `keyword_review_approved.xlsx`
9. `amazon-keyword-mapper` → `keyword_map.md`
10. `amazon-listing-builder` → `question_library.md`, `drafts_comparison.md`, `listing_package.md`
11. `amazon-listing-auditor` → `audit_report.md`

只有上一阶段核心文件存在且没有未解决 Blocker，才进入下一阶段。`Needs confirmation` 若会改变宣传真实性或核心关键词，则暂停并向用户提一个精简问题；不影响当前工作的次要缺失保留为 Unknown。生成 `keyword_review.xlsx` 后必须暂停，用户明确确认并完成 A/B 级词审核前不得进入关键词映射。

## 工作方式

- 用户只要求某一阶段时，仅调用对应 Skill。
- 用户说“继续”时，从现有产物判断下一阶段，不重做已完成且未变更的步骤。
- 产品事实变化时，标记受影响的适配、分类、优先级、映射、Listing 和审核产物为需更新。
- 新增竞品时，从语料阶段起增量更新；不得清空用户已有人工判断。
- 新增付费关键词数据时，从优先级阶段起增强；不改写原始语料来源。

## 最终交付

交付目录包含：

`input_data.json, product_facts.md, evidence_library.md, competitor_corpus.md, keyword_candidates.csv, keyword_library.md, keyword_review.xlsx, keyword_review_approved.xlsx, keyword_map.md, question_library.md, drafts_comparison.md, listing_package.md, audit_report.md`

最终摘要说明数据来源、日期、站点、是否包含真实搜索量/ABA/排名数据，以及仍未确认的产品事实。
