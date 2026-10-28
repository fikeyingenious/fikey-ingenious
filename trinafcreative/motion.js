/* Native motion: no scroll interception, video download or animation dependency. */
(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  const toggle = document.querySelector('.motion-toggle');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 801px)');
  let userPaused = false;
  let heroVisible = true;
  let frame = 0;
  let entrancePlayed = false;
  const authoredAnimations = new Set();

  function play(element, frames, options) {
    if (!element || preference.matches || !element.animate) return;
    const animation = element.animate(frames, {easing: 'cubic-bezier(.16,1,.3,1)', fill: 'none', ...options});
    authoredAnimations.add(animation);
    animation.finished.catch(() => {}).finally(() => authoredAnimations.delete(animation));
    return animation;
  }
  function syncMotion() {
    root.classList.toggle('motion-active', !preference.matches);
    root.classList.toggle('motion-paused', userPaused || !heroVisible || document.hidden || preference.matches);
    toggle.hidden = preference.matches;
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.setAttribute('aria-label', userPaused ? 'Play studio animation' : 'Pause studio animation');
    toggle.querySelector('span').textContent = userPaused ? 'Play motion' : 'Pause motion';
    authoredAnimations.forEach(animation => {
      if (!hero.contains(animation.effect?.target)) return;
      if (userPaused || !heroVisible || document.hidden) animation.pause();
      else animation.play();
    });
    if (preference.matches) {
      authoredAnimations.forEach(animation => animation.cancel());
      resetDepth();
    }
  }
  function entrance() {
    if (entrancePlayed || preference.matches) return;
    entrancePlayed = true;
    const lines = document.querySelectorAll('.headline-line');
    lines.forEach((line, index) => play(line, [
      {clipPath:'inset(0 0 75% 0)', transform:'translateY(14px)', filter:'blur(2px)'},
      {clipPath:'inset(0 0 0% 0)', transform:'translateY(0)', filter:'blur(0px)'}
    ], {duration:800, delay:100 + index * 100, fill:'backwards'}));
    play(document.querySelector('.hero .intro'), [{opacity:.65},{opacity:1}], {duration:650,delay:350,fill:'backwards'});
  }
  function resetDepth() {
    art.style.removeProperty('--scene-x');
    art.style.removeProperty('--scene-y');
  }
  hero.addEventListener('pointermove', event => {
    if (preference.matches || userPaused || !finePointer.matches || !heroVisible || frame) return;
    frame = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      art.style.setProperty('--scene-x', ((event.clientX - rect.left) / rect.width - .5) * -9 + 'px');
      art.style.setProperty('--scene-y', ((event.clientY - rect.top) / rect.height - .5) * -6 + 'px');
      frame = 0;
    });
  }, {passive:true});
  hero.addEventListener('pointerleave', resetDepth);
  toggle.addEventListener('click', () => {userPaused = !userPaused;resetDepth();syncMotion();});
  preference.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    syncMotion();
  }, {threshold: .05}).observe(hero);

  // One editorial fan-in when the work first enters view; the rest stays quiet.
  const gallery = document.querySelector('.work-gallery');
  const galleryObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    galleryObserver.disconnect();
    if (preference.matches) return;
    gallery.querySelectorAll('.work-panel').forEach((panel,index) => play(panel,[
      {clipPath:'inset(0 0 0 90%)',filter:'brightness(.7)'},
      {clipPath:'inset(0 0 0 0%)',filter:'brightness(1)'}
    ],{duration:700,delay:index*65}));
  },{threshold:.12});
  galleryObserver.observe(gallery);

  window.animateCatalogUpdate = () => {
    const list = document.querySelector('#productList');
    list.getAnimations().forEach(animation => animation.cancel());
    play(list,[{opacity:.5,filter:'blur(1px)'},{opacity:1,filter:'blur(0px)'}],{duration:220});
  };
  document.querySelector('#quoteForm').addEventListener('submit',() => {
    play(document.querySelector('#formResult'),[{opacity:.5},{opacity:1}],{duration:250});
  });

  // Follow the visitor through real sections; Home is no longer permanently active.
  const navLinks = [...document.querySelectorAll('nav a')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const visibleSections = new Map();
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => visibleSections.set(entry.target.id, entry));
    const active = [...visibleSections.values()].filter(entry => entry.isIntersecting)
      .sort((a,b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
    if (!active) return;
    navLinks.forEach(link => {
      const selected = link.getAttribute('href') === '#' + active.target.id;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
  }, {rootMargin:'-10% 0px -50% 0px',threshold:0});
  sections.forEach(section => sectionObserver.observe(section));
  syncMotion();
  entrance();
})();
