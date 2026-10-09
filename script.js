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
