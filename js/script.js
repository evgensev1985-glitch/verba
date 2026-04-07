document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const header = document.querySelector('.header');
  let lastScroll = 0;

  // Mobile Nav
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('active');
      navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const position = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: position, behavior: 'smooth' });
        history.pushState(null, null, targetId);
      }
    });
  });

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = current;
  }, { passive: true });

  // Intersection Observer for Sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(20px)';
    sec.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(sec);
  });

  // Phone Tracking
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof ym === 'function') ym(XXXXXXX, 'reachGoal', 'phone_click');
      if (window.gtag) gtag('event', 'click', { event_category: 'phone' });
    });
  });

  // iOS double-tap fix
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    if (Date.now() - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = Date.now();
  }, { passive: false });

  console.log('%c🌿 Верба Глэмпинг', 'color:#2C5F2D; font-weight:bold;');
});