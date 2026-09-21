---
name: amazon-keyword-extractor
description: 从已整理的 Amazon 竞品语料中提取可检索的关键词短语、购买意图表达和产品问法，并保留来源位置。适用于关键词候选生成；不做产品适用性判定或搜索量估算。
---

# Amazon Keyword Extractor

从 `competitor_corpus.md` 提取“有意义的短语”，避免把每个单词都当关键词。

## 提取范围

- 产品核心短语：产品是什么。
- 属性与功能短语：结构、材质、容量、安装、门、轮等。
- 场景与对象短语：用于哪里、收纳什么、适合谁。
- 问题/需求短语：解决什么麻烦。
- 规格短语：层数、尺寸、容量等。
- 自然语言问题：买家可能如何询问。

保留常见 2–6 词短语；只有当单词本身具有独立检索意义时才保留单词。不要抽取冠词、连接词、泛化形容词或脱离产品后无意义的片段。

## 证据与计数

每个候选项记录：

- `raw_phrase`
- `competitor_ids`
- `competitor_count`
- `occurrence_count`
- `source_fields`
- `source_excerpt`（短摘录，仅用于定位）
- `candidate_type`

`competitor_count` 按竞品去重；`occurrence_count` 才记录总次数。不得把任一字段命名为 Search Volume。

## 输出

生成 `keyword_candidates.csv` 与简短的 `keyword_extraction_notes.md`。CSV 一行一个候选短语，保留原始大小写和来源；品牌词、竞品型号和疑似商标先标记，不在本阶段静默删除。

不要判断该词是否适用于用户产品，也不要生成 Listing。
