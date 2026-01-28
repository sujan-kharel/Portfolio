// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when clicking a link (mobile)
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// Active link highlighting on scroll
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const setActiveLink = () => {
  const scrollPos = window.scrollY + 120; // offset for sticky header
  let current = sections[0]?.id;
  for (const sec of sections) {
    if (scrollPos >= sec.offsetTop) current = sec.id;
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Respect prefers-reduced-motion for background video
const backgroundVideo = document.getElementById('backgroundVideo');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches && backgroundVideo) {
  backgroundVideo.pause();
  backgroundVideo.removeAttribute('autoplay');
}

// Back-to-top smooth scroll
const toTop = document.getElementById('toTop');
toTop?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#top');
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();