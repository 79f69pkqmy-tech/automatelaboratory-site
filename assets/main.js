// Automate Laboratory — lightweight interactions (no framework)

(function () {
  // Mobile menu
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.style.display === 'block';
      mobileMenu.style.display = open ? 'none' : 'block';
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  } else {
    // Fallback
    els.forEach((el) => el.classList.add('in'));
  }

  // Year
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
