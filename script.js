/* ============================================================
   ASHISH KAMAT — script.js
   1. Terminal ticker (typewriter)
   2. Nav scroll behaviour
   3. Scroll reveal (IntersectionObserver)
   4. FAQ accordion
   5. Hamburger menu
   ============================================================ */

// ---- 1. TERMINAL TICKER ----
const TICKER_LINES = [
  '> Entity recognition F1: 0.91 on custom corpus',
  '> Inference latency: 3.2s → 0.4s (production pipeline)',
  '> 5 production NLP systems deployed',
  '> RAG system indexing 10,000+ enterprise documents',
];

const tickerEl = document.getElementById('ticker-line');
let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let tickerTimeout;

function typeTicker() {
  const currentLine = TICKER_LINES[lineIndex];

  if (!isDeleting) {
    charIndex++;
    tickerEl.textContent = currentLine.slice(0, charIndex);

    if (charIndex === currentLine.length) {
      // Pause at full line, then start deleting
      tickerTimeout = setTimeout(() => {
        isDeleting = true;
        typeTicker();
      }, 1800);
      return;
    }
    tickerTimeout = setTimeout(typeTicker, 60);
  } else {
    charIndex--;
    tickerEl.textContent = currentLine.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % TICKER_LINES.length;
      tickerTimeout = setTimeout(typeTicker, 400);
      return;
    }
    tickerTimeout = setTimeout(typeTicker, 28);
  }
}

// Start ticker after a short delay
setTimeout(typeTicker, 600);


// ---- 2. NAV SCROLL BEHAVIOUR ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ---- 3. SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// ---- 4. FAQ ACCORDION ----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


// ---- 5. HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});
