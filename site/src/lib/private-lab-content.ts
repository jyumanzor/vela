import "server-only";
type EvidenceRow = {useCase:string;observed:string;state:string;nextTest:string;source:string};
type StrategyProblem = {title:string;evidence:string;implication:string;test:string};
export function privateLabContent(): {evidenceRows:EvidenceRow[];strategyProblems:StrategyProblem[]} {
 const raw=process.env.VELA_PRIVATE_LAB_CONTENT;
 if(!raw)return {evidenceRows:[],strategyProblems:[]};
 const content=JSON.parse(raw);
 return {evidenceRows:content.evidenceRows??[],strategyProblems:content.strategyProblems??[]};
}
