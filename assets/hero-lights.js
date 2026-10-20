const heroLightsSection = document.querySelector('.hero-reference');
const heroLightsPreference = matchMedia('(prefers-reduced-motion: reduce)');
let heroLightsVisible = false;
function syncHeroLights() {
  const running = heroLightsVisible && !document.hidden && !heroLightsPreference.matches;
  heroLightsSection.dataset.lights = running ? 'running' : 'paused';
}
new IntersectionObserver(entries => {
  heroLightsVisible = entries[0].isIntersecting;
  syncHeroLights();
}).observe(heroLightsSection);
document.addEventListener('visibilitychange', syncHeroLights);
heroLightsPreference.addEventListener('change', syncHeroLights);
syncHeroLights();
