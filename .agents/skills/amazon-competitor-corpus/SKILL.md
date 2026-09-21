---
name: amazon-competitor-corpus
description: 把人工采集的 Amazon 竞品 Title、Highlights、Bullets、Description 和 A+ 整理成可追溯语料库。适用于用户粘贴多个竞品文案；不声称获得搜索量、销量或后台流量数据。
---

# Amazon Competitor Corpus

将原始竞品文案标准化，但不改写原意，不把竞品声明当成用户产品事实。

## 输入

每个竞品尽量包含：ASIN 或自定义编号、URL（如有）、Title、Item Highlights、5 Bullets、Description、A+、采集日期、站点。缺失字段保留为空并标记 `Not collected`。

## 处理

1. 为每个竞品分配稳定 ID，如 `C01`。
2. 保留原文；仅清理多余空格、乱码和重复粘贴段落。
3. 按位置切分：`title / highlights / bullet_1..5 / description / a_plus / qa`。
4. 标记疑似品牌名、型号、竞品专属规格和无法验证的营销声明，但不在此阶段删除。
5. 统计覆盖竞品数和出现位置时，以竞品 ID 去重，避免同一竞品反复堆词造成虚高。

## 输出

生成 `competitor_corpus.md`，包含：

- Corpus metadata：站点、采集日期、竞品数量、缺失字段。
- 每个竞品的分区原文。
- `Source index`：竞品 ID、ASIN、字段、段落编号。
- 数据限制声明：这是公开文案语料，不代表搜索量、销量、排名、流量或转化。

如用户只提供一个竞品，照常整理，但提醒覆盖频率没有统计意义。不要开始写 Listing。
