const scene = document.querySelector('.workbench-scene');
const hero = document.querySelector('.hero-workbench');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let pending = false;
let pointerX = 0;
let pointerY = 0;
function updateScene() {
  const visible = hero.getBoundingClientRect().bottom > 0;
  const active = !preference.matches && innerWidth > 850 && visible;
  scene.style.setProperty('--art-x', `${active ? pointerX : 0}px`);
  scene.style.setProperty('--art-y', `${active ? pointerY + Math.min(scrollY,700) * .065 : 0}px`);
  pending = false;
}
function schedule() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(updateScene);
}
hero.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch' || preference.matches) return;
  pointerX = (event.clientX / innerWidth - .5) * 7;
  pointerY = (event.clientY / innerHeight - .5) * 4;
  schedule();
}, { passive: true });
hero.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; schedule(); });
addEventListener('scroll',schedule,{ passive: true });
addEventListener('resize',schedule,{ passive: true });
preference.addEventListener('change',schedule);
schedule();
