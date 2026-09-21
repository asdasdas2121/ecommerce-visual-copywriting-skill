import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const [inputPath, outputPath, previewPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error("Usage: build_review_workbook.mjs input.json output.xlsx [preview.png]");
}

const input = JSON.parse(await fs.readFile(inputPath, "utf8"));
const keywords = Array.isArray(input.keywords) ? input.keywords : [];
const facts = Array.isArray(input.facts) ? input.facts : [];
const maxRows = Math.max(1000, keywords.length + 50);
const firstDataRow = 6;
const lastDataRow = firstDataRow + Math.max(0, keywords.length - 1);
const font = "Arial";

const workbook = Workbook.create();
const review = workbook.worksheets.add("Keyword Review");
const factSheet = workbook.worksheets.add("Product Facts");

review.showGridLines = false;
factSheet.showGridLines = false;
review.tabColor = "#1F4E78";
factSheet.tabColor = "#A9C4DE";

review.getRange("A2:W2").merge();
review.getRange("A2").values = [[`${input.productName || "Amazon product"} keyword review`]];
review.getRange("A2").format = {
  font: { name: font, size: 15, bold: true, color: "#1F2937" },
  verticalAlignment: "center",
};
review.getRange("A2:W2").format.rowHeight = 26;

review.getRange("A3:H3").values = [[
  "Total keywords", keywords.length,
  "Pending human review", null,
  "AI rejected", null,
  "Data note", "Competitor frequency is not search volume",
]];
review.getRange("D3").formulas = [[`=COUNTIFS($H$${firstDataRow}:$H$${Math.max(lastDataRow, firstDataRow)},"Pending human review")`]];
review.getRange("F3").formulas = [[`=COUNTIFS($Q$${firstDataRow}:$Q$${Math.max(lastDataRow, firstDataRow)},"Rejected")`]];
review.getRange("A3:H3").format.font = { name: font, size: 10 };
review.getRange("A3:H3").format.verticalAlignment = "center";
review.getRange("A3:H3").format.rowHeight = 22;
review.getRange("A4:W4").merge();
review.getRange("A4").values = [["Fill the yellow Human columns. The workflow stops here until you explicitly confirm the review is complete."]];
review.getRange("A4").format = {
  fill: "#FFF2CC",
  font: { name: font, size: 10, italic: true, color: "#7F6000" },
};

const headers = [
  "ID", "Keyword", "Human decision", "Human class", "Human priority", "Human placement", "Human notes", "Final decision",
  "Original variants", "Concept group", "Primary class", "Secondary classes", "Competitor IDs", "Competitor count",
  "Occurrence count", "Source positions", "AI fit", "AI reason", "Evidence or conditions", "Relevance score",
  "Intent score", "AI priority", "AI suggested placement",
];
review.getRange("A5:W5").values = [headers];
review.getRange("A5:W5").format = {
  fill: "#1F4E78",
  font: { name: font, size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "outside", style: "thin", color: "#1F4E78" },
};
review.getRange("A5:W5").format.rowHeight = 34;

if (keywords.length) {
  const rows = keywords.map((k, index) => [
    k.id || `K${String(index + 1).padStart(3, "0")}`,
    k.keyword || "",
    "", "", "", "", "", null,
    k.originalVariants || "",
    k.conceptGroup || "",
    k.primaryClass || "",
    k.secondaryClasses || "",
    k.competitorIds || "",
    Number.isFinite(Number(k.competitorCount)) ? Number(k.competitorCount) : null,
    Number.isFinite(Number(k.occurrenceCount)) ? Number(k.occurrenceCount) : null,
    k.sourcePositions || "",
    k.aiFit || "Needs confirmation",
    k.aiReason || "",
    k.evidenceOrConditions || "",
    Number.isFinite(Number(k.relevanceScore)) ? Number(k.relevanceScore) : null,
    Number.isFinite(Number(k.intentScore)) ? Number(k.intentScore) : null,
    k.aiPriority || "Hold",
    k.aiSuggestedPlacement || "",
  ]);
  review.getRange(`A${firstDataRow}:W${lastDataRow}`).values = rows;
  for (let row = firstDataRow; row <= lastDataRow; row += 1) {
    review.getRange(`H${row}`).formulas = [[`=IF(C${row}="","Pending human review",C${row})`]];
  }
  review.tables.add(`A5:W${lastDataRow}`, true, "KeywordReviewTable");
  review.getRange(`A${firstDataRow}:W${lastDataRow}`).format.font = { name: font, size: 10, color: "#1F2937" };
  review.getRange(`A${firstDataRow}:W${lastDataRow}`).format.verticalAlignment = "top";
  review.getRange(`C${firstDataRow}:M${lastDataRow}`).format.wrapText = true;
  review.getRange(`P${firstDataRow}:W${lastDataRow}`).format.wrapText = true;
  review.getRange(`C${firstDataRow}:G${lastDataRow}`).format.fill = "#FFF2CC";
}

review.getRange(`C${firstDataRow}:C${maxRows}`).dataValidation = {
  rule: { type: "list", values: ["Accept", "Conditional", "Reject", "Needs review"] },
};
review.getRange(`D${firstDataRow}:D${maxRows}`).dataValidation = {
  rule: { type: "list", values: ["Core", "Feature", "Scenario", "Problem", "Specification", "Audience-Object", "Semantic"] },
};
review.getRange(`E${firstDataRow}:E${maxRows}`).dataValidation = {
  rule: { type: "list", values: ["A", "B", "C", "Hold"] },
};
review.getRange(`F${firstDataRow}:F${maxRows}`).dataValidation = {
  rule: { type: "list", values: ["Title", "Highlights", "Bullets", "Description-A+", "Search Terms", "QA", "Do not use"] },
};

const aiFitRange = review.getRange(`Q${firstDataRow}:Q${Math.max(lastDataRow, firstDataRow)}`);
aiFitRange.conditionalFormats.add("containsText", { text: "Allowed", format: { fill: "#E2F0D9", font: { color: "#375623" } } });
aiFitRange.conditionalFormats.add("containsText", { text: "Conditional", format: { fill: "#FFF2CC", font: { color: "#7F6000" } } });
aiFitRange.conditionalFormats.add("containsText", { text: "Rejected", format: { fill: "#FCE4D6", font: { color: "#C00000", bold: true } } });
aiFitRange.conditionalFormats.add("containsText", { text: "Needs confirmation", format: { fill: "#F4B183", font: { color: "#7F4125" } } });
const finalRange = review.getRange(`H${firstDataRow}:H${Math.max(lastDataRow, firstDataRow)}`);
finalRange.conditionalFormats.add("containsText", { text: "Pending human review", format: { fill: "#FFF2CC", font: { color: "#7F6000", bold: true } } });
finalRange.conditionalFormats.add("containsText", { text: "Reject", format: { fill: "#FCE4D6", font: { color: "#C00000", bold: true } } });

const widths = {
  A: 10, B: 30, C: 18, D: 18, E: 14, F: 20, G: 32, H: 22, I: 28, J: 24,
  K: 17, L: 20, M: 17, N: 13, O: 13, P: 20, Q: 18, R: 34, S: 34, T: 13,
  U: 12, V: 12, W: 22,
};
for (const [col, width] of Object.entries(widths)) review.getRange(`${col}:${col}`).format.columnWidth = width;
review.freezePanes.freezeRows(5);
review.freezePanes.freezeColumns(2);

factSheet.getRange("A2:E2").merge();
factSheet.getRange("A2").values = [[`${input.productName || "Amazon product"} facts used for keyword review`]];
factSheet.getRange("A2").format = { font: { name: font, size: 15, bold: true, color: "#1F2937" } };
factSheet.getRange("A4:E4").values = [["Fact", "Value", "Status", "Source", "Notes"]];
factSheet.getRange("A4:E4").format = {
  fill: "#4472C4", font: { name: font, size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center", verticalAlignment: "center",
};
if (facts.length) {
  factSheet.getRange(`A5:E${4 + facts.length}`).values = facts.map((f) => [
    f.fact || "", f.value || "", f.status || "Unknown", f.source || "", f.notes || "",
  ]);
  factSheet.tables.add(`A4:E${4 + facts.length}`, true, "ProductFactsTable");
  factSheet.getRange(`A5:E${4 + facts.length}`).format.wrapText = true;
}
factSheet.getRange("A:E").format.font = { name: font, size: 10, color: "#1F2937" };
factSheet.getRange("A:A").format.columnWidth = 26;
factSheet.getRange("B:B").format.columnWidth = 34;
factSheet.getRange("C:C").format.columnWidth = 16;
factSheet.getRange("D:D").format.columnWidth = 24;
factSheet.getRange("E:E").format.columnWidth = 42;
factSheet.freezePanes.freezeRows(4);

workbook.recalculate();
await fs.mkdir(path.dirname(outputPath), { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

if (previewPath) {
  await fs.mkdir(path.dirname(previewPath), { recursive: true });
  const preview = await workbook.render({ sheetName: "Keyword Review", range: `A1:W${Math.min(Math.max(lastDataRow, 10), 18)}`, scale: 1 });
  await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
  const factsPreview = await workbook.render({ sheetName: "Product Facts", autoCrop: "all", scale: 1 });
  await fs.writeFile(path.join(path.dirname(previewPath), "facts-preview.png"), new Uint8Array(await factsPreview.arrayBuffer()));
}

const inspect = await workbook.inspect({
  kind: "table",
  range: `Keyword Review!A2:W${Math.min(Math.max(lastDataRow, 10), 15)}`,
  include: "values,formulas",
  tableMaxRows: 15,
  tableMaxCols: 23,
  maxChars: 10000,
});
console.log(inspect.ndjson);
const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);
