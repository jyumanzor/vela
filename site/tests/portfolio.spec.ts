import {test,expect} from '@playwright/test';
import {projects} from '../src/data/portfolio';
import {pageSpecs} from '../src/data/page-specs';
import {routeUseCase} from '../src/lib/ai-use-case-lab';
import fs from 'node:fs';
const proof='../docs/verification/2026-09-20-portfolio';
test('catalog search, category intersection and empty recovery',async({page})=>{
 await page.goto('/');await expect(page.locator('.project-row')).toHaveCount(11);
 await page.getByRole('button',{name:'Client sites',exact:true}).click();await expect(page.locator('.project-row')).toHaveCount(3);
 await page.getByRole('searchbox').fill('doldol');await expect(page.locator('.project-row')).toHaveCount(1);await expect(page.locator('.project-row')).toContainText('Paused');await expect(page.locator('.project-row').getByText('Visit site')).toHaveCount(0);
 await page.getByRole('searchbox').fill('no such project');await expect(page.getByText('No matching projects')).toBeVisible();await page.getByRole('button',{name:'Clear filters'}).click();await expect(page.locator('.project-row')).toHaveCount(11);
});
test('project notes resolve, paused destinations are absent and old links redirect',async({page})=>{
 for(const p of projects){await page.goto(`/projects/${p.slug}`);await expect(page.getByRole('heading',{level:1})).toHaveText(p.name);if(p.status==='Paused')await expect(page.locator('.portfolio-button')).toHaveCount(0);}
 await page.goto('/showcase');await expect(page).toHaveURL(/\/projects$/);await page.goto('/access/jenn');await expect(page).toHaveURL(/\/projects$/);
 await page.goto('/projects/not-real');await expect(page.getByText('This page could not be found.')).toBeVisible();
});
test('private gate rejects wrong password, permits admin and isolates client access',async({page,context})=>{
 await page.goto('/access/jenn/workspace/lab');await expect(page).toHaveURL(/\/access\/jenn\/workspace$/);await expect(page.getByLabel('Access password')).toBeVisible();await expect(page.getByText('Decision drill',{exact:true})).toHaveCount(0);
 await page.getByLabel('Access password').fill('incorrect');await page.getByRole('button',{name:'Enter workspace'}).click();await expect(page.getByText('That password didn’t match. Try again.')).toBeVisible();
 await page.getByLabel('Access password').fill('local-e2e-admin');await page.getByRole('button',{name:'Enter workspace'}).click();await page.getByRole('link',{name:/AI Use-Case Lab/}).click();await expect(page.getByRole('heading',{name:'AI use-case lab',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Task router',exact:true}).click();await expect(page.locator('select').first()).toBeVisible();
 await page.goto('/api/access/jenn?signout=1');await page.goto('/access/jenn/workspace/lab');await expect(page.getByLabel('Access password')).toBeVisible();
 await page.goto('/access/cameron/workspace');await page.getByLabel('Access password').fill('local-e2e-cameron');await page.getByRole('button',{name:'Enter workspace'}).click();await expect(page.getByText('Welcome back',{exact:false})).toBeVisible();await page.goto('/access/jenn/workspace/lab');await expect(page.getByLabel('Access password')).toBeVisible();await context.clearCookies();
});
test('mobile menu opens, Escape closes it, navigation works',async({page})=>{await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Open menu',exact:true}).click();await expect(page.locator('#vela-nav-menu')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#vela-nav-menu')).toHaveCount(0);await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.locator('#vela-nav-menu').getByRole('link',{name:'Workspaces',exact:true}).click();await expect(page).toHaveURL(/\/workspaces$/);});
test('rendered geometry, scale and console across viewports',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});const measurements=[];const snapshots=[];
 for(const width of [390,768,1440,1920])for(const route of ['/','/projects/doldol','/workspaces']){
  await page.setViewportSize({width,height:900});await page.goto(route);await page.evaluate(()=>document.fonts.ready);
  const m=await page.evaluate(()=>{const box=(e:Element)=>{const r=e.getBoundingClientRect();return [r.x,r.y+scrollY,r.width,r.height]};const title=document.querySelector('[data-page-role="hero-title"]')!;const body=document.querySelector('[data-page-role="body-copy"]')!;const shell=document.querySelector('.portfolio-shell')!;const rect=shell.getBoundingClientRect();const regions=Array.from(document.querySelectorAll('.portfolio-intro,.directory-heading,.directory-controls,.directory-count,.project-row,.portfolio-methods,.project-detail>header,.project-detail-grid,.project-next,.workspace-index>h1,.workspace-index>.portfolio-lede,.workspace-links'));return {scale:visualViewport!.scale,overflow:document.documentElement.scrollWidth-innerWidth,title:parseFloat(getComputedStyle(title).fontSize),body:parseFloat(getComputedStyle(body).fontSize),gutter:Math.min(rect.left,innerWidth-rect.right),height:document.documentElement.scrollHeight,objects:regions.map((e,i)=>({id:`region-${i}`,kind:'container',rect:box(e)}))};});
  const spec=route==='/'?pageSpecs.catalog:pageSpecs.detail;expect(m.scale).toBe(1);expect(m.overflow).toBeLessThanOrEqual(0);expect(m.gutter).toBeGreaterThanOrEqual(23.9);expect(m.title).toBeGreaterThanOrEqual(spec.title[0]);expect(m.title).toBeLessThanOrEqual(spec.title[1]);expect(m.body).toBeGreaterThanOrEqual(16);expect(m.body).toBeLessThanOrEqual(18);
  measurements.push({route,width,...m});snapshots.push({id:`${route}-${width}`,phase:'rendered',canvas:{width,height:m.height},objects:m.objects,evidence:'Playwright getBoundingClientRect at page scale 1; region boxes, not glyph outlines'});
  await page.screenshot({path:`${proof}/${route==='/'?'home':route.includes('doldol')?'doldol':'workspaces'}-${width}.png`,fullPage:true,caret:'initial'});
 }
 fs.writeFileSync(`${proof}/measurements.json`,JSON.stringify(measurements,null,2));fs.writeFileSync(`${proof}/rendered-geometry.json`,JSON.stringify({version:1,surface_id:'vela-portfolio-rendered',snapshots,constraints:{}},null,2));expect(errors).toEqual([]);
});
test('migrated router preserves permission and human-review boundaries',()=>{for(const taskId of ['source-review','model-change','excel-formatting'] as const){expect(routeUseCase({taskId,dataClass:'public',permission:'not_permitted',expertWork:false}).status).toBe('stop');expect(routeUseCase({taskId,dataClass:'client',permission:'unknown',expertWork:false}).status).toBe('stop');expect(routeUseCase({taskId,dataClass:'privileged',permission:'confirmed',expertWork:true}).status).toBe('escalate');}});

test('missing workspace signing secret rejects known fallback tokens',async()=>{
 const ts=await import('typescript');const {spawnSync}=await import('node:child_process');
 const source=fs.readFileSync('src/lib/clientAuth.ts','utf8');const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const probe=js+`;const crypto=require('node:crypto');const forged=crypto.createHmac('sha256','vela-dev-secret-set-VELA_AUTH_SECRET-in-prod').update('vela:admin').digest('hex');if(exports.verifyAdmin(forged)||exports.checkAdminPassword('fixture'))process.exit(1);`;
 const env:NodeJS.ProcessEnv={...process.env,VELA_ADMIN_PASSWORD:'fixture'};delete env.VELA_AUTH_SECRET;const result=spawnSync(process.execPath,['-e',probe],{env,encoding:'utf8'});expect(result.status,result.stderr).toBe(0);
});
