/* ==========================================================================
   BMV strategy — chování stránky
   --------------------------------------------------------------------------
   Bez závislostí. Odhalování obsahu při scrollu, zvýrazňování aktivní kotvy,
   mobilní menu. Veškerý pohyb respektuje prefers-reduced-motion; při vypnutém
   pohybu se obsah rovnou nastaví do koncového stavu.
   ========================================================================== */

(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsIO = 'IntersectionObserver' in window;
  const nativeScrollTimeline =
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('animation-timeline: view()');

  /* --- odhalování obsahu při scrollu -------------------------------------- */

  const revealables = document.querySelectorAll('[data-reveal]');

  const revealAll = () => {
    for (const el of revealables) el.classList.add('is-in', 'is-settled');
  };

  if (!supportsIO || reduced.matches) {
    revealAll();
  } else {
    const observer = new IntersectionObserver(
      (entries, self) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          entry.target.addEventListener(
            'transitionend',
            () => entry.target.classList.add('is-settled'),
            { once: true },
          );
          self.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );

    for (const el of revealables) observer.observe(el);
  }

  /* --- moment 1: rozsvěcující se zvýrazněné pasáže ------------------------ */

  const marks = document.querySelectorAll('.mark');

  if (!supportsIO || reduced.matches) {
    for (const el of marks) el.classList.add('is-lit');
  } else {
    const lighter = new IntersectionObserver(
      (entries, self) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-lit');
          self.unobserve(entry.target);
        }
      },
      // Pasáž se rozsvítí, až se dostane do čtecí zóny zhruba v 60 % výšky okna.
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    );

    for (const el of marks) lighter.observe(el);
  }

  /* --- moment 2: záložní odhalování řádků prohlášení ---------------------- */

  // Nativní scroll-driven animace (animation-timeline: view()) obstará vše sama.
  // Tahle větev je pro prohlížeče, které ji zatím neumí.
  const lines = document.querySelectorAll('.strategy__statement .line');

  if (!nativeScrollTimeline) {
    if (!supportsIO || reduced.matches) {
      for (const el of lines) el.classList.add('is-lit');
    } else {
      const scrubber = new IntersectionObserver(
        (entries, self) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-lit');
            self.unobserve(entry.target);
          }
        },
        { rootMargin: '-25% 0px -30% 0px', threshold: 0 },
      );

      for (const el of lines) scrubber.observe(el);
    }
  }

  /* --- aktivní kotva v navigaci ------------------------------------------- */

  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (supportsIO && sections.length) {
    const visible = new Set();

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }

        const current = sections.find((section) => visible.has(section));

        for (const link of navLinks) {
          const isCurrent = current && link.getAttribute('href') === `#${current.id}`;
          if (isCurrent) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    for (const section of sections) spy.observe(section);
  }

  /* --- mobilní menu -------------------------------------------------------- */

  const button = document.querySelector('.menu-button');
  const menu = document.getElementById('mobilni-menu');
  const main = document.getElementById('obsah');
  const footer = document.getElementById('kontakt');

  if (button && menu) {
    const items = [...menu.querySelectorAll('a')];
    items.forEach((item, i) => item.style.setProperty('--d', `${i * 45}ms`));

    const isOpen = () => button.getAttribute('aria-expanded') === 'true';

    const setInert = (on) => {
      if (main) main.inert = on;
      if (footer) footer.inert = on;
    };

    const setOpen = (open) => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
      document.body.style.overflow = open ? 'hidden' : '';
      setInert(open);

      if (open) {
        menu.hidden = false;
        // Vynutit reflow, aby náběh položek proběhl i při okamžitém zobrazení.
        void menu.offsetHeight;
        menu.classList.add('is-open');
      } else {
        menu.classList.remove('is-open');
        menu.hidden = true;
      }
    };

    button.addEventListener('click', () => setOpen(!isOpen()));

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (!isOpen()) return;

      if (event.key === 'Escape') {
        setOpen(false);
        button.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const trap = [button, ...items];
      const first = trap[0];
      const last = trap[trap.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    document.addEventListener('focusin', (event) => {
      if (!isOpen()) return;
      if (menu.contains(event.target) || button.contains(event.target)) return;
      items[0]?.focus();
    });

    const wide = window.matchMedia('(min-width: 769px)');
    const onWide = (event) => {
      if (event.matches && isOpen()) setOpen(false);
    };
    if (typeof wide.addEventListener === 'function') wide.addEventListener('change', onWide);
    else wide.addListener(onWide);
  }
})();
