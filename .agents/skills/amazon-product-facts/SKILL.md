---
name: amazon-product-facts
description: 建立或核对 Amazon 产品事实、证据、限制和禁用声明。适用于开始竞品分析或 Listing 写作前；不负责抽取竞品关键词或生成 Listing。
---

# Amazon Product Facts

先把用户提供的信息视为待核对材料，而不是自动当成可宣传事实。目标是生成后续模块唯一可依赖的事实基线。

## 输入

接受聊天文字、规格表、包装资料、产品图、供应商说明或用户明确确认。信息不足时只询问会改变关键词适用性或宣传真实性的关键问题；其余字段标记 `Unknown`，不得猜测。

至少整理：产品类型、结构、变体、层数/容量、尺寸、材质、门/轮/隔板/安装结构、适用场景、确认卖点、明确不存在的功能、测试或认证情况、站点与语言。

## 判断状态

- `Confirmed`：用户明确确认，或规格/图像/测试证据直接支持。
- `Conditional`：只能在限定条件下表达，例如容量受鞋码影响。
- `Unknown`：尚无证据，不得扩写成肯定声明。
- `False`：产品明确不具备，加入禁用清单。

图片只能证明可见结构；不能单凭渲染图证明承重、防水、耐用、安全、认证或性能。

## 输出

生成：

1. `input_data.json`：保留用户原始信息与来源，不覆盖原文。
2. `product_facts.md`：结构化事实表，字段含 `Fact / Value / Status / Source / Notes`。
3. `evidence_library.md`：字段含 `Claim / Evidence / Status / Safe wording / Prohibited wording`。

结尾必须列出：

- `Confirmed claims`
- `Conditional claims`
- `Unknowns requiring confirmation`
- `Prohibited or unsupported claims`

不要生成标题、五点或 Search Terms。
