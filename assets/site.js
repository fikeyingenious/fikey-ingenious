const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const nav = document.getElementById('siteNav');
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
const steps = document.getElementById('processSteps');
const stepItems = [...document.querySelectorAll('.process-step')];
const projects = [...document.querySelectorAll('.project')];
const backToTop = document.getElementById('backToTop');
let framePending = false;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: motionPreference.matches ? 'instant' : 'smooth' });
  document.getElementById('heroTitle').focus({ preventScroll: true });
});

document.getElementById('year').textContent = new Date().getFullYear();

function closeMenu(restoreFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.querySelector('i').className = 'bi bi-list';
  links.classList.remove('is-open');
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  if (toggle.getAttribute('aria-expanded') === 'true') return closeMenu();
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close navigation');
  toggle.querySelector('i').className = 'bi bi-x-lg';
  links.classList.add('is-open');
});
links.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && links.classList.contains('is-open')) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target)) closeMenu();
});

function updateFrame() {
  const viewport = innerHeight;
  const stepsRect = steps.getBoundingClientRect();
  const stepRects = stepItems.map(item => item.getBoundingClientRect());
  const projectRects = projects.map(item => item.getBoundingClientRect());
  const lastNode = stepRects[stepRects.length - 1].top - stepsRect.top + 12;
  const progress = Math.min(1, Math.max(0, (viewport * .66 - stepsRect.top) / Math.max(lastNode, 1)));
  nav.classList.toggle('is-scrolled', scrollY > 24);
  backToTop.hidden = scrollY < 400;
  steps.style.setProperty('--process-fill', progress);
  stepItems.forEach((item, index) => item.classList.toggle('is-active', stepRects[index].top < viewport * .68));
  projects.forEach((project, index) => {
    const rect = projectRects[index];
    if (rect.bottom <= 0 || rect.top >= viewport) return;
    const depth = motionPreference.matches ? 0 : ((viewport - rect.top) / (viewport + rect.height) - .5) * 36;
    project.style.setProperty('--project-shift', `${depth}px`);
  });
  framePending = false;
}
function scheduleFrame() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(updateFrame);
}
addEventListener('scroll', scheduleFrame, { passive: true });
addEventListener('resize', scheduleFrame, { passive: true });
motionPreference.addEventListener('change', scheduleFrame);
scheduleFrame();

const activeServices = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.target.classList.toggle('is-current', entry.isIntersecting));
}, { threshold: .5 });
document.querySelectorAll('.service-row').forEach(item => {
  activeServices.observe(item);
  item.addEventListener('pointerenter', () => item.classList.add('is-connected'));
  item.addEventListener('pointerleave', () => item.classList.remove('is-connected'));
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const error = document.getElementById('formError');
  if (!form.checkValidity()) {
    error.textContent = 'Please complete your name, a valid email address, and a short project description.';
    form.reportValidity();
    return;
  }
  error.textContent = '';
  const data = new FormData(form);
  const subject = `Project enquiry: ${data.get('subject')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\nProject: ${data.get('message')}`;
  location.href = `mailto:fikeyingenious@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
