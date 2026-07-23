// Dark / light mode toggle
(function () {
  var btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var html = document.documentElement;
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('rita-theme', next); } catch (e) {}
    });
  }
})();

// Mobile hamburger menu
(function () {
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  // Mark active link
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  mobileNav.querySelectorAll('a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === path) a.classList.add('active');
  });

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (mobileNav.classList.contains('open') &&
        !hamburger.contains(e.target) &&
        !mobileNav.contains(e.target)) {
      closeMenu();
    }
  });
})();
