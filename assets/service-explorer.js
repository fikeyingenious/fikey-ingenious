(() => {
  const section = document.querySelector('.service-offers');
  if (!section) return;
  const tabs = [...section.querySelectorAll('.offer-tab')];
  const panels = [...section.querySelectorAll('.offer-panel')];
  const navigation = section.querySelector('.offer-navigation');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let selected = 0;

  navigation.setAttribute('role', 'tablist');
  navigation.setAttribute('aria-label', 'Explore our services');
  navigation.setAttribute('aria-orientation', innerWidth <= 760 ? 'horizontal' : 'vertical');
  section.classList.add('offers-enhanced');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
  });

  function activate(index, focus = false) {
    selected = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
      panels[i].classList.remove('is-arriving');
    });
    if (!preference.matches) panels[index].classList.add('is-arriving');
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', event => {
      const vertical = navigation.getAttribute('aria-orientation') === 'vertical';
      const next = vertical ? 'ArrowDown' : 'ArrowRight';
      const previous = vertical ? 'ArrowUp' : 'ArrowLeft';
      if (![next, previous, 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let destination = index;
      if (event.key === next) destination = (index + 1) % tabs.length;
      if (event.key === previous) destination = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') destination = 0;
      if (event.key === 'End') destination = tabs.length - 1;
      activate(destination, true);
    });
  });
  activate(0);

  function updateMotion() {
    const running = visible && !document.hidden && !preference.matches;
    section.dataset.motion = running ? 'running' : 'paused';
    if (!running) panels[selected].classList.remove('is-arriving');
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) panels.forEach(panel => { panel.querySelector('img').loading = 'eager'; });
    updateMotion();
  }, { threshold: 0 }).observe(section);
  preference.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  addEventListener('resize', () => navigation.setAttribute('aria-orientation', innerWidth <= 760 ? 'horizontal' : 'vertical'));
  updateMotion();

  section.querySelectorAll('[data-service-enquiry]').forEach(link => {
    link.addEventListener('click', () => {
      const field = document.getElementById('subject');
      const service = link.dataset.serviceEnquiry;
      if (field) {
        if (![...field.options].some(option => option.value === service)) field.add(new Option(service, service));
        field.value = service;
      }
      field?.dispatchEvent(new Event('change', { bubbles: true }));
      document.getElementById('name')?.focus({ preventScroll: true });
    });
  });
})();
