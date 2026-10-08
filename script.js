document.documentElement.classList.add('js');
const menu = document.querySelector('.menu');
const links = document.querySelector('#links');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); links.classList.toggle('is-open', open); });
links.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 851px)').addEventListener('change', closeMenu);
