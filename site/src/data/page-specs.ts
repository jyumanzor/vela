export type PageSpec = {profile: string; organization: string; title: [number, number]; body: [number, number]; minimumGutter: number; maximumOverflow: number; locked: string[]; creativeFreedom: string};
export const pageSpecs: Record<string, PageSpec> = {
 catalog: {profile:"project-catalog",organization:"compact-list",title:[56,88],body:[16,18],minimumGutter:24,maximumOverflow:0,locked:["Forest-night palette","One project source","No live links for paused projects"],creativeFreedom:"Row grouping and restrained gold affordances"},
 detail: {profile:"system-explainer",organization:"subpages",title:[40,64],body:[16,18],minimumGutter:24,maximumOverflow:0,locked:["Source-backed project copy","Public descriptions only"],creativeFreedom:"Project-specific screenshots and narrative"}
};
export const portfolioRoutes = [{route:"/",spec:"catalog"},{route:"/projects",spec:"catalog"},{route:"/projects/[slug]",spec:"detail"}];
