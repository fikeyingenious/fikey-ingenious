const contactSection = document.getElementById('contact');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let contactVisible = false;

function syncContactMotion() {
  const running = contactVisible && !document.hidden && !reducedMotion.matches;
  contactSection.dataset.motion = reducedMotion.matches ? 'reduced' : running ? 'running' : 'paused';
}

new IntersectionObserver(entries => {
  contactVisible = entries[0].isIntersecting;
  syncContactMotion();
}, { threshold: 0 }).observe(contactSection);
document.addEventListener('visibilitychange', syncContactMotion);
reducedMotion.addEventListener('change', syncContactMotion);
syncContactMotion();
