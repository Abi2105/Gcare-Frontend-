/* Shared behaviour for every page: mobile side navigation and the Home / About-us active state. */
(function () {
  'use strict';

  // ----- Mobile side navigation (same as the reference's openNav / closeNav) -----
  var sidenav = document.getElementById('mySidenav');
  var openBtn = document.querySelector('.mobile-menu .bar');
  var closeBtn = sidenav && sidenav.querySelector('.closebtn');

  function setNav(open) {
    if (sidenav) sidenav.style.width = open ? '100%' : '0';
  }
  if (openBtn) openBtn.addEventListener('click', function () { setNav(true); });
  if (closeBtn) {
    closeBtn.addEventListener('click', function () { setNav(false); });
    closeBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setNav(false);
      }
    });
  }
  if (sidenav) {
    sidenav.querySelectorAll('a[href]').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
  }

  // ----- On the home page, "About us" becomes active when #about-us is in the URL -----
  if (location.pathname === '/') {
    var links = document.querySelectorAll('#navbarTogglerDemo02 .nav-link');
    var syncActive = function () {
      links.forEach(function (a) {
        var href = a.getAttribute('href');
        var active = href === '/#about-us' ? location.hash === '#about-us' : href === '/' && location.hash !== '#about-us';
        a.classList.toggle('active', active);
      });
    };
    window.addEventListener('hashchange', syncActive);
    syncActive();
  }
})();
