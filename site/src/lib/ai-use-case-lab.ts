export type DataClass = "public" | "internal" | "client" | "privileged";
export type PermissionState = "confirmed" | "unknown" | "not_permitted";
export type TaskId = "source-review" | "argument-review" | "excel-formatting" | "exhibit-design" | "model-change" | "deposition-prep";
export type RouteChoice = "approved-ai" | "automation" | "human" | "stop";

export type RouterInput = { taskId: TaskId; dataClass: DataClass; permission: PermissionState; expertWork: boolean };
export type RouteResult = { status: "test" | "controlled" | "escalate" | "stop"; route: string; reason: string; allowedInput: string; humanCheck: string; proof: string };
export type DecisionScenario = { id: string; title: string; situation: string; detail: string; correctChoice: RouteChoice; review: string; evidence: string };

export const taskOptions: Array<{ id: TaskId; label: string }> = [
  { id: "source-review", label: "Compare reports and source material" },
  { id: "argument-review", label: "Find weak or unsupported arguments" },
  { id: "excel-formatting", label: "Apply repeatable Excel formatting" },
  { id: "exhibit-design", label: "Turn analysis into a clear exhibit" },
  { id: "model-change", label: "Change a damages model or assumption" },
  { id: "deposition-prep", label: "Prepare questions and practice answers" },
];

const taskRules: Record<TaskId, Omit<RouteResult, "status" | "allowedInput">> = {
  "source-review": {
    route: "Approved Microsoft 365 AI, scoped to the relevant files",
    reason: "Search and comparison benefit from grounded retrieval when permissions and source scope are checked first.",
    humanCheck: "Open every cited passage and resolve conflicts between sources.",
    proof: "Citation coverage, missed-source rate, and reviewer correction time.",
  },
  "argument-review": {
    route: "Approved AI for issue spotting; reviewer writes the final comment",
    reason: "A rubric can help find paragraphs that deserve attention. It cannot decide whether the analysis is defensible.",
    humanCheck: "Confirm each flagged issue against the report, record, and analytical method.",
    proof: "Known-issue recall, false-positive rate, and minutes per reviewed page.",
  },
  "excel-formatting": {
    route: "Deterministic automation, with AI used only to help specify the rules",
    reason: "Repeated formatting needs consistent execution and a visible audit trail.",
    humanCheck: "Check formulas, units, links, hidden cells, print layout, and a sample of formatted outputs.",
    proof: "Defects before and after, manual minutes, and rerun consistency.",
  },
  "exhibit-design": {
    route: "Approved AI for alternatives; analyst selects and rebuilds the final exhibit",
    reason: "AI can widen the design set, while the analyst still owns the message, numbers, and source trail.",
    humanCheck: "Tie every number to the model and test the exhibit against the question it must answer.",
    proof: "Tie-out results, reviewer edit burden, and comprehension on a known example.",
  },
  "model-change": {
    route: "Analyst-controlled code and review",
    reason: "A model change affects the opinion and must remain reproducible, reviewable, and attributable.",
    humanCheck: "Reperform the change, compare outputs, review assumptions, and document the decision.",
    proof: "Independent rerun, reconciliation, sensitivity check, and reviewer sign-off.",
  },
  "deposition-prep": {
    route: "Approved AI for practice questions after matter permission is confirmed",
    reason: "Question generation can add variety. Case strategy, privilege, and the final preparation plan remain human decisions.",
    humanCheck: "Counsel or the case lead reviews scope, accuracy, privilege, and strategic fit.",
    proof: "Coverage against the report, unsupported-question rate, and reviewer disposition.",
  },
};

export function routeUseCase(input: RouterInput): RouteResult {
  const base = taskRules[input.taskId];
  if (input.permission === "not_permitted") return { ...base, status: "stop", route: "Do not use AI on this work", reason: "The matter or workstream does not permit AI use.", allowedInput: "Use a generic checklist or synthetic example with no matter content." };
  const sensitive = input.dataClass === "client" || input.dataClass === "privileged";
  if (sensitive && input.permission !== "confirmed") return { ...base, status: "stop", route: "Pause before entering matter content", reason: "Tool access does not establish matter permission.", allowedInput: "Use public, synthetic, or fully de-identified material until permission is confirmed." };
  if (input.expertWork && sensitive) return { ...base, status: "escalate", route: "Confirm legal or counsel sign-off, then use only the cleared FTI surface", reason: "Expert and sensitive engagement work requires an explicit decision before AI use.", allowedInput: "Only the specific content and surface covered by the approval." };
  if (sensitive) return { ...base, status: "controlled", allowedInput: "Only matter content covered by the confirmed permission, in the cleared FTI surface." };
  if (input.dataClass === "internal") return { ...base, status: "controlled", allowedInput: "Internal non-client material in an FTI-approved surface with current permissions." };
  return { ...base, status: "test", allowedInput: "Public or synthetic material with no client identifiers or confidential facts." };
}

export const decisionScenarios: DecisionScenario[] = [
  { id: "report-screen", title: "Report issue spotting", situation: "A reviewer has a 120-page training report and a rubric of known writing and support defects.", detail: "The goal is to locate paragraphs for human review. No client data is used.", correctChoice: "approved-ai", review: "Use approved AI to apply the rubric and return paragraph references. The reviewer verifies every flag and writes the comment.", evidence: "Compare recall and false positives against a report with known defects." },
  { id: "format-workbooks", title: "Workbook formatting", situation: "Thirty output sheets need the same fonts, number formats, borders, widths, and print settings.", detail: "The rules are explicit and the result must be identical on every rerun.", correctChoice: "automation", review: "Use a script or Office automation. AI can help draft the specification, but repeatability comes from deterministic code.", evidence: "Run twice, compare files, and count formatting defects on a fixed sample." },
  { id: "public-chat-client-file", title: "Client workbook summary", situation: "A consultant wants to upload a client workbook to a public AI account for a quick summary.", detail: "Matter permission and tool approval have not been confirmed.", correctChoice: "stop", review: "Do not upload the workbook. Start with the permission question and, if useful, test the prompt on synthetic data.", evidence: "The correct outcome is prevention, with the proposed test preserved in a no-data form." },
  { id: "damages-conclusion", title: "Damages conclusion", situation: "The model is complete and the final report needs a conclusion about the damages result.", detail: "The sentence will carry the expert's opinion and must match the model and record.", correctChoice: "human", review: "The analyst and expert own the conclusion. AI may assist only within an approved, permissioned workflow and never supplies the final opinion.", evidence: "Tie the language to the model, sources, assumptions, and expert review." },
  { id: "sharepoint-comparison", title: "Source comparison", situation: "Two report versions and their cited sources are stored in a permissioned SharePoint matter library.", detail: "The matter permits the approved Microsoft 365 AI surface.", correctChoice: "approved-ai", review: "Use scoped retrieval to compare the files and require citations. Open the cited passages before relying on the answer.", evidence: "Measure missed changes, incorrect citations, and reviewer time against a manual comparison." },
];

export function summarizeDecisions(answers: Record<string, { choice: RouteChoice; confidence: number }>) {
  const completed = decisionScenarios.filter((scenario) => answers[scenario.id]);
  const correct = completed.filter((scenario) => answers[scenario.id].choice === scenario.correctChoice);
  const incorrect = completed.filter((scenario) => answers[scenario.id].choice !== scenario.correctChoice);
  const average = (items: DecisionScenario[]) => items.length ? Math.round(items.reduce((sum, scenario) => sum + answers[scenario.id].confidence, 0) / items.length) : 0;
  const aiOveruse = completed.filter((scenario) => answers[scenario.id].choice === "approved-ai" && scenario.correctChoice !== "approved-ai").length;
  const automationMisses = completed.filter((scenario) => scenario.correctChoice === "automation" && answers[scenario.id].choice !== "automation").length;
  let hypothesis = "More trials are needed before inferring a decision pattern.";
  if (aiOveruse > 0) hypothesis = "Current choices may over-assign AI where permission, deterministic automation, or human accountability should control the route.";
  else if (automationMisses > 0) hypothesis = "Current choices may underuse deterministic automation for work with explicit rules and repeatable outputs.";
  else if (completed.length >= 3) hypothesis = "Current choices distinguish AI assistance from automation and final human judgment. Test the pattern on real approved tasks next.";
  return { completed: completed.length, correct: correct.length, averageConfidenceCorrect: average(correct), averageConfidenceIncorrect: average(incorrect), hypothesis };
}
