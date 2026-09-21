---
name: amazon-keyword-prioritizer
description: 在缺少付费搜索数据时，对 Amazon 关键词按产品相关度、竞品覆盖、购买意图、证据强度和表达自然度评分；有卖家精灵、Sorftime 或 ABA 数据时可追加数据评分。适用于词库排序，不负责文案分配。
---

# Amazon Keyword Prioritizer

离线评分必须与真实搜索量严格区分。不得把网页结果数、竞品出现次数或主观热度改名为搜索量。

## 基础评分

每项 0–10：

- `Product relevance`：与产品本体及变体的匹配程度。
- `Competitor coverage`：按竞品覆盖比例换算，而非总出现次数。
- `Purchase intent`：短语是否接近明确购买需求。
- `Evidence confidence`：产品事实与证据支持程度。
- `Naturalness`：英语表达是否自然、是否像真实搜索或购物表达。

默认综合分：`35% relevance + 20% coverage + 20% intent + 15% evidence + 10% naturalness`。如用户有明确策略可调整，但要记录权重。

## 数据增强

如用户提供 Search Volume、ABA Rank、Organic Rank、Traffic Share、Conversion Share，保留原始来源、日期和站点，并另算 `data_enhanced_score`。缺失值写 `Not provided`，不得补造。

## 优先级

- `A`：高相关、高购买意图、证据充分，优先前台核心位置。
- `B`：重要补充或高价值长尾。
- `C`：语义补充、场景扩展或后台候选。
- `Hold`：待确认、自然度差或价值不明。

## 输出

在 `keyword_library.md` 增加评分栏，并生成 `keyword_priority_report.md`，说明权重、数据限制、Top concepts 和分歧项。下一步必须生成 `keyword_review.xlsx` 交给用户人工审核；不要直接进入关键词映射，也不要分配到具体 Listing 字段。
