---
name: amazon-keyword-normalizer
description: 清洗 Amazon 关键词候选表，处理大小写、标点、词形、精确重复、近义短语、品牌词和来源合并。适用于 keyword_candidates.csv；不做产品适配或 Listing 分配。
---

# Amazon Keyword Normalizer

生成可审计的规范化词库。不要用粗暴词根化把含义不同的短语合并。

## 规范化规则

1. 生成小写规范形式，统一多余空格、连字符和明显标点差异。
2. 精确重复合并来源与计数。
3. 单复数、常见词形变化可建立同一 `concept_group`，但保留各原始短语。
4. 近义词只归组，不互相删除，例如 `foldable` 与 `collapsible`。
5. 语序变化仅在语义相同且不改变自然度时归组。
6. 品牌、ASIN、竞品型号进入隔离表；除非用户拥有或获准使用，不进入通用词库。
7. 不相关词不在此阶段因主观产品判断删除；留给适配检查。

需要批量处理 CSV 时运行 `scripts/normalize_keywords.py`，再人工审查脚本标记的 concept groups。

## 输出

更新或生成 `keyword_candidates_normalized.csv`，字段至少包括：

`canonical_phrase, original_variants, concept_group, competitor_ids, competitor_count, occurrence_count, source_fields, brand_flag, normalization_notes`

另生成 `brand_and_model_quarantine.md`。不要推断搜索量、转化率或适用性。
