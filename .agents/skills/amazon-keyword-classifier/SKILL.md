---
name: amazon-keyword-classifier
description: 将已通过产品适配检查的 Amazon 关键词建立 7 层、多标签语义词库。适用于关键词架构与覆盖分析；不做搜索量估算、优先级评分或文案生成。
---

# Amazon Keyword Classifier

只处理 `Allowed` 和 `Conditional` 关键词；`Needs confirmation` 单独保留，`Rejected` 不进入可用词库。

## 七层分类

- `Core`：产品是什么。
- `Feature`：功能、结构、材质或使用方式。
- `Scenario`：使用空间或情境。
- `Problem`：用户想解决的麻烦或需求。
- `Specification`：尺寸、层数、容量、颜色等客观规格。
- `Audience/Object`：目标人群或收纳对象。
- `Semantic`：同义表达、自然语言长尾和相关问法。

允许一个词拥有多个标签，但必须指定一个 `primary_class`。不要为了填满分类而强行归类。

## 输出

生成 `keyword_library.md`，主表字段：

`Keyword / Concept group / Primary class / Secondary classes / Fit status / Competitor count / Source positions / Conditions / Notes`

另输出：

- 各层词表
- 概念组与同义表达
- 语义缺口：竞品语料未覆盖但由产品事实合理产生的表达，必须标为 `product-derived`，不可伪装成竞品词
- 自然语言问题候选，供问题库与 QA 使用

不要给出 A/B/C 优先级。
