(function () {
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (!navToggle || !mainNav) {
    return;
  }

  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('main-nav--open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      mainNav.classList.remove('main-nav--open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
