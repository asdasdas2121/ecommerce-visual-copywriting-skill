---
name: amazon-listing-auditor
description: 审核已生成的 Amazon Listing 的事实准确性、风险表达、关键词覆盖、语义完整性、可读性与转化逻辑，并给出可追溯修订建议。适用于最终交付前；不重新发明产品卖点。
---

# Amazon Listing Auditor

审核 `listing_package.md`，并回查产品事实、证据、关键词库和关键词地图。审核结果必须指出具体字段和修改理由。

## 五项审核

1. `Fact accuracy`：每项声明能否回到事实或证据；条件是否保留。
2. `Compliance risk`：品牌侵权、竞品型号、绝对化、无法证实的安全/环保/医疗/认证/性能词；对变化中的平台规则标记需查官方来源。
3. `Keyword coverage`：A/B 级词的精确或语义覆盖、无价值重复、Search Terms 冲突。
4. `Semantic coverage`：是否回答产品是什么、适合谁/哪里、解决什么、规格限制、如何使用；模拟自然语言问答时不得声称是真实 Alexa/Rufus 排名测试。
5. `Conversion logic`：信息顺序、清晰度、可读性、差异化、疑虑处理和证据匹配。

## 严重度

- `Blocker`：事实错误、侵权、高风险误导或关键字段不符合已知要求。
- `Major`：重要词或买家疑虑缺失、结构明显影响理解。
- `Minor`：措辞、自然度、局部重复或格式问题。

## 输出

生成 `audit_report.md`，包含：

- 总结与是否可交付：`Pass / Pass with revisions / Fail`
- 问题表：`Severity / Field / Text / Issue / Evidence / Recommended revision`
- 关键词覆盖矩阵
- 未解决问题
- 修订后的关键段落（仅修订必要部分）

如存在 Blocker，不得输出“已合规”或“可直接上线”。
