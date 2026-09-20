"use client";

import { useMemo, useState } from "react";
import { decisionScenarios, routeUseCase, summarizeDecisions, taskOptions, type DataClass, type PermissionState, type RouteChoice, type RouterInput, type TaskId } from "@/lib/ai-use-case-lab";

type Surface = "drill" | "router" | "evidence" | "strategy";

const routeChoices: Array<{ id: RouteChoice; label: string; note: string }> = [
  { id: "approved-ai", label: "Approved AI", note: "Use a cleared FTI surface" },
  { id: "automation", label: "Automation", note: "Use deterministic code or rules" },
  { id: "human", label: "Human analysis", note: "Keep judgment with the reviewer" },
  { id: "stop", label: "Stop", note: "Resolve permission before use" },
];

const policyRules = [
  "Tool availability does not establish matter permission.",
  "Client, expert, privileged, and confidential content stays inside a specifically cleared workflow.",
  "Expert or sensitive engagement use requires explicit legal or counsel sign-off.",
  "A named human reviews sources, calculations, qualifiers, and release status.",
];

function StatusBadge({ state }: { state: string }) {
  const className = state === "Demonstrated" ? "status-badge demonstrated" : state === "Failed test" || state === "Known limitation" ? "status-badge limited" : "status-badge candidate";
  return <span className={className}>{state}</span>;
}

type LabContent = {
 evidenceRows: {useCase:string;observed:string;state:string;nextTest:string;source:string}[];
 strategyProblems: {title:string;evidence:string;implication:string;test:string}[];
};
export default function Home({evidenceRows,strategyProblems}:LabContent) {
  const [surface, setSurface] = useState<Surface>("drill");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [choice, setChoice] = useState<RouteChoice | null>(null);
  const [confidence, setConfidence] = useState(70);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, { choice: RouteChoice; confidence: number }>>({});
  const [routerInput, setRouterInput] = useState<RouterInput>({ taskId: "argument-review", dataClass: "public", permission: "unknown", expertWork: false });
  const scenario = decisionScenarios[scenarioIndex];
  const decisionSummary = useMemo(() => summarizeDecisions(answers), [answers]);
  const routerResult = useMemo(() => routeUseCase(routerInput), [routerInput]);

  function switchSurface(next: Surface) { setSurface(next); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function revealDecision() {
    if (!choice) return;
    setAnswers((current) => ({ ...current, [scenario.id]: { choice, confidence } }));
    setRevealed(true);
  }
  function selectScenario(index: number) {
    const prior = answers[decisionScenarios[index].id];
    setScenarioIndex(index); setChoice(prior?.choice ?? null); setConfidence(prior?.confidence ?? 70); setRevealed(Boolean(prior));
  }

  return (
    <main>
      <header className="site-header">
        <button className="wordmark" onClick={() => switchSurface("drill")} type="button"><span className="mark" aria-hidden="true">sj</span><span>strategy-jenn <i>/ AI use cases</i></span></button>
        <nav aria-label="Primary navigation">
          {([ ["drill", "Decision drill"], ["router", "Task router"], ["evidence", "Test record"], ["strategy", "Strategy notes"] ] as Array<[Surface, string]>).map(([id, label]) => <button className={surface === id ? "active" : ""} key={id} onClick={() => switchSurface(id)} type="button">{label}</button>)}
        </nav>
        <span className="preview-state"><i /> Working prototype</span>
      </header>

      {surface === "drill" && <>
        <section className="hero">
          <div className="hero-copy"><p className="eyebrow">FTI litigation consulting</p><h1>AI use-case lab</h1><p>Test where approved AI can help, what evidence is allowed, and what a human must still decide.</p></div>
          <dl className="source-window"><div><dt>Evidence window</dt><dd>June 25 to August 3, 2026</dd></div><div><dt>Current scope</dt><dd>LDR Econ development and client-work methods</dd></div><div><dt>Policy status</dt><dd>Working rules; confirm matter-specific use</dd></div></dl>
        </section>
        <section className="drill-shell">
          <div className="section-heading"><div><p className="eyebrow dark">Decision drill</p><h2>Choose a route, then read the review.</h2></div><p>Confidence is recorded because a wrong answer at 95% means something different from a wrong answer at 55%.</p></div>
          <div className="scenario-tabs" role="tablist" aria-label="Use-case scenarios">
            {decisionScenarios.map((item, index) => <button aria-selected={scenarioIndex === index} className={scenarioIndex === index ? "active" : answers[item.id] ? "answered" : ""} key={item.id} onClick={() => selectScenario(index)} role="tab" type="button"><span>0{index + 1}</span>{item.title}</button>)}
          </div>
          <div className="scenario-grid">
            <article className="scenario-card">
              <p className="small-label">Scenario {scenarioIndex + 1} of {decisionScenarios.length}</p><h3>{scenario.situation}</h3><p>{scenario.detail}</p>
              <fieldset><legend>Best starting route</legend><div className="choice-grid">{routeChoices.map((item) => <button className={choice === item.id ? "selected" : ""} key={item.id} onClick={() => { setChoice(item.id); setRevealed(false); }} type="button"><b>{item.label}</b><span>{item.note}</span></button>)}</div></fieldset>
              <label className="confidence-control"><span>Confidence <b>{confidence}%</b></span><input min="50" max="100" onChange={(event) => { setConfidence(Number(event.target.value)); setRevealed(false); }} type="range" value={confidence} /></label>
              <button className="primary-action" disabled={!choice} onClick={revealDecision} type="button">Review this choice</button>
            </article>
            <aside className={`decision-review ${revealed ? "visible" : ""}`} aria-live="polite">
              {!revealed ? <div className="review-empty"><span>?</span><h3>Review hidden</h3><p>Choose a route and record your confidence first.</p></div> : <><p className="small-label">Review</p><div className={choice === scenario.correctChoice ? "decision-result correct" : "decision-result incorrect"}><span>{choice === scenario.correctChoice ? "Aligned" : "Reconsider"}</span><b>{routeChoices.find((item) => item.id === scenario.correctChoice)?.label}</b></div><p>{scenario.review}</p><div className="proof-box"><b>Required proof</b><span>{scenario.evidence}</span></div></>}
            </aside>
          </div>
          <div className="decision-summary"><div><span>Trials</span><strong>{decisionSummary.completed}/{decisionScenarios.length}</strong></div><div><span>Route agreement</span><strong>{decisionSummary.correct}/{decisionSummary.completed}</strong></div><div><span>Confidence when correct</span><strong>{decisionSummary.averageConfidenceCorrect ? `${decisionSummary.averageConfidenceCorrect}%` : "–"}</strong></div><div className="theory-cell"><span>Current hypothesis</span><p>{decisionSummary.hypothesis}</p></div></div>
        </section>
      </>}

      {surface === "router" && <section className="page-shell">
        <div className="page-intro"><p className="eyebrow dark">Task router</p><h1>Describe the work</h1><p>The result separates tool fit from permission and review requirements.</p></div>
        <div className="router-layout">
          <form className="router-form" onSubmit={(event) => event.preventDefault()}>
            <label><span>Task</span><select value={routerInput.taskId} onChange={(event) => setRouterInput((current) => ({ ...current, taskId: event.target.value as TaskId }))}>{taskOptions.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
            <label><span>Data class</span><select value={routerInput.dataClass} onChange={(event) => setRouterInput((current) => ({ ...current, dataClass: event.target.value as DataClass }))}><option value="public">Public or synthetic</option><option value="internal">Internal, non-client</option><option value="client">Client or confidential</option><option value="privileged">Privileged or expert material</option></select></label>
            <label><span>Matter or workstream permission</span><select value={routerInput.permission} onChange={(event) => setRouterInput((current) => ({ ...current, permission: event.target.value as PermissionState }))}><option value="confirmed">Confirmed</option><option value="unknown">Unknown</option><option value="not_permitted">Not permitted</option></select></label>
            <label className="check-row"><input checked={routerInput.expertWork} onChange={(event) => setRouterInput((current) => ({ ...current, expertWork: event.target.checked }))} type="checkbox" /><span><b>Expert or otherwise sensitive engagement work</b><small>Requires an explicit sign-off decision before AI use.</small></span></label>
            <div className="policy-note"><b>Policy boundary</b><p>This prototype does not approve a tool or a matter. It shows the next question and the safest test that can proceed.</p></div>
          </form>
          <article className={`router-result ${routerResult.status}`}><div className="result-topline"><span>{routerResult.status}</span><small>Recommended starting point</small></div><h2>{routerResult.route}</h2><p>{routerResult.reason}</p><dl><div><dt>Allowed input</dt><dd>{routerResult.allowedInput}</dd></div><div><dt>Human check</dt><dd>{routerResult.humanCheck}</dd></div><div><dt>Evidence to collect</dt><dd>{routerResult.proof}</dd></div></dl></article>
        </div>
        <div className="rule-strip">{policyRules.map((rule, index) => <div key={rule}><span>0{index + 1}</span><p>{rule}</p></div>)}</div>
      </section>}

      {surface === "evidence" && <section className="page-shell">
        <div className="page-intro split"><div><p className="eyebrow dark">Test record</p><h1>Observed use cases</h1></div><p>Each row separates what happened from the next test. A useful example is not yet a reusable method.</p></div>
        <div className="evidence-table" role="table" aria-label="AI use-case evidence"><div className="evidence-head" role="row"><span role="columnheader">Use case</span><span role="columnheader">Observed</span><span role="columnheader">State</span><span role="columnheader">Next test</span></div>{evidenceRows.map((row) => <article key={row.useCase} role="row"><div role="cell"><h2>{row.useCase}</h2><small>{row.source}</small></div><p role="cell">{row.observed}</p><div role="cell"><StatusBadge state={row.state} /></div><p role="cell">{row.nextTest}</p></article>)}</div>
        <div className="measurement-panel"><div><p className="eyebrow">Experiment record</p><h2>Minimum fields</h2></div><ol><li><b>Task and benchmark</b><span>Define the manual answer or known defects before the test.</span></li><li><b>Inputs and permission</b><span>Record data class, matter decision, tool, and source scope.</span></li><li><b>Result and edits</b><span>Keep the output, reviewer disposition, corrections, and time spent.</span></li><li><b>Promotion decision</b><span>Name the owner, approved home, maintenance rule, and stop condition.</span></li></ol></div>
      </section>}

      {surface === "strategy" && <section className="page-shell">
        <div className="page-intro split"><div><p className="eyebrow dark">Strategy notes</p><h1>Current adoption problems</h1></div><p>These problems come from meeting notes, training observations, failed prototypes, and the Microsoft work-intelligence record.</p></div>
        <div className="problem-list">{strategyProblems.map((problem, index) => <article key={problem.title}><div className="problem-number">0{index + 1}</div><div><p className="small-label">Problem</p><h2>{problem.title}</h2></div><div><p className="small-label">Evidence</p><p>{problem.evidence}</p></div><div><p className="small-label">Design implication</p><p>{problem.implication}</p></div><div><p className="small-label">Next test</p><p>{problem.test}</p></div></article>)}</div>
        <div className="source-register"><div><p className="eyebrow">Evidence boundary</p><h2>Sources used in this prototype</h2></div><ul><li><span>June 25</span> PowerPoint Copilot training observations</li><li><span>July 20</span> Project debrief and AI strategy meeting notes</li><li><span>August 3</span> AI governance and operating-model discussion notes</li><li><span>Current</span> Microsoft Work Intelligence product map and FTI guardrails</li></ul><p>Meeting language is paraphrased. Tool availability and FTI approval can change; verify both before applying a recommendation to client work.</p></div>
      </section>}

      <footer><span>FTI Consulting · LDR Econ</span><p>AI use-case lab · working prototype · no client data</p><button onClick={() => switchSurface("strategy")} type="button">Sources and limits</button></footer>
    </main>
  );
}
