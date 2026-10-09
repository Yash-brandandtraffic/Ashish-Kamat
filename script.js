document.documentElement.classList.add('js');
const menu = document.querySelector('.menu');
const links = document.querySelector('#links');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); links.classList.toggle('is-open', open); });
links.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 1151px)').addEventListener('change', closeMenu);

const heroVideo=document.querySelector('#hero-video');
const videoReduced=matchMedia('(prefers-reduced-motion: reduce)');
let videoVisible=false;
function syncVideo(){if(videoVisible&&!document.hidden&&!videoReduced.matches){heroVideo.play().catch(()=>{});}else heroVideo.pause();}
new IntersectionObserver(entries=>{videoVisible=entries[0].isIntersecting;syncVideo();},{threshold:.05}).observe(document.querySelector('#home'));
videoReduced.addEventListener('change',syncVideo);document.addEventListener('visibilitychange',syncVideo);

// One-time entrance animations, with an immediate reduced-motion fallback.
const motionPref=matchMedia('(prefers-reduced-motion: reduce)');
const motionCards=[...document.querySelectorAll('.glass-card,.offer,.contact')];
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');revealObserver.unobserve(e.target);}});},{threshold:.08});
motionCards.forEach((card,i)=>{card.classList.add('motion-card');card.style.setProperty('--reveal-delay',`${(i%3)*70}ms`);revealObserver.observe(card);});
if(!motionPref.matches)document.documentElement.classList.add('motion-ready');
motionPref.addEventListener('change',()=>{if(motionPref.matches){document.documentElement.classList.remove('motion-ready');motionCards.forEach(c=>c.classList.add('is-visible'));}});

const header=document.querySelector('header');
const syncHeader=()=>header.classList.toggle('is-scrolled',scrollY>30);
addEventListener('scroll',syncHeader,{passive:true});syncHeader();
const navAnchors=[...document.querySelectorAll('#links>a:not(.button)')];
new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){navAnchors.forEach(a=>a.classList.toggle('is-active',a.hash===`#${e.target.id}`));}}},{rootMargin:'-15% 0px -55% 0px'}).observe(document.querySelector('#solutions'));
const sectionObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting);if(visible.length){const id=visible[0].target.id;navAnchors.forEach(a=>a.classList.toggle('is-active',a.hash===`#${id}`));}},{rootMargin:'-10% 0px -55% 0px'});
navAnchors.forEach(a=>{const el=document.querySelector(a.hash);if(el)sectionObserver.observe(el);});

function interactiveChoices(container,labels,descriptions,initial=0){
 container.replaceChildren();
 const controls=document.createElement('div');controls.className=container.classList.contains('matrix')?'matrix-controls':'journey-controls';
 const note=document.createElement('p');note.className='interaction-note';note.setAttribute('aria-live','polite');
 const buttons=labels.map((label,i)=>{const btn=document.createElement('button');btn.type='button';btn.className='interaction-button';btn.textContent=label;btn.addEventListener('click',()=>select(i));controls.append(btn);return btn;});
 function select(i){buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));note.textContent=descriptions[i];}
 container.append(controls,note);select(initial);return controls;
}
const matrix=document.querySelector('.matrix');
if(matrix){interactiveChoices(matrix,['Explore','Prioritize','Reconsider','Assess'],['Promising potential, with feasibility or data questions to resolve.','A valuable opportunity with a practical path to validation.','Revisit the objective or consider a simpler approach.','Check dependencies, constraints and expected value before investing.'],1);}
const solutions=[...document.querySelectorAll('.solution-grid .solution')];
const knowledge=interactiveChoices(solutions[1].querySelector('.mini'),['Question','Relevant information','Answer + sources'],['Start with the question your team needs answered.','Retrieve relevant passages from approved business information.','Present an answer with references, or flag insufficient evidence.']);
const workflow=interactiveChoices(solutions[2].querySelector('.mini'),['AI-assisted task','Human approval','Connected system'],['Use AI for the agreed repeatable task within defined limits.','The responsible person reviews the output before the next action.','Send approved information to the agreed system and record the outcome.'],1);
const flowObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){if(!motionPref.matches)e.target.classList.add('flow-intro');flowObserver.unobserve(e.target);}}),{threshold:.3});
[knowledge,workflow].forEach(el=>flowObserver.observe(el));
solutions.forEach(card=>card.addEventListener('pointerenter',()=>{const controls=card.querySelector('.journey-controls');if(controls&&!motionPref.matches){controls.classList.remove('flow-intro');void controls.offsetWidth;controls.classList.add('flow-intro');}}));

const toolsCard=[...document.querySelectorAll('.background-cards article')].find(c=>c.querySelector('h3')?.textContent==='Tools & platforms');
if(toolsCard){const filters=document.createElement('div');filters.className='tool-filters';const groups={All:[],Data:['Python','SQL','BigQuery'],AI:['OpenAI API','Google ADK','Vertex AI'],Cloud:['Vertex AI','BigQuery','Cloud Run','Firestore','Docker']};
 const btns=[];Object.entries(groups).forEach(([name,items])=>{const b=document.createElement('button');b.type='button';b.className='interaction-button';b.textContent=name;b.setAttribute('aria-pressed',String(name==='All'));b.addEventListener('click',()=>{btns.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));toolsCard.querySelectorAll('.tags span').forEach(tag=>{const selected=name==='All'||items.includes(tag.textContent);tag.classList.toggle('tool-dim',!selected);tag.classList.toggle('tool-highlight',name!=='All'&&selected);});});btns.push(b);filters.append(b);});toolsCard.querySelector('.tags').before(filters);}
const heroNav=document.querySelector('header');new ResizeObserver(()=>document.documentElement.style.setProperty('--measured-nav',`${heroNav.getBoundingClientRect().height}px`)).observe(heroNav);
