// Scripta/Spectra Lab — nav solidify on scroll + scroll reveals + mobile menu.
(function () {
  var nav = document.getElementById('nav');
  var hero = document.body.classList.contains('has-hero');

  // On hero pages the header fades in gradually as you scroll: transparent at the
  // very top, fully solid by ~200px. (Non-hero pages are solid by default in CSS.)
  var ticking = false;
  function apply() {
    var t = Math.min((window.scrollY || 0) / 200, 1);
    nav.style.setProperty('--sc', t.toFixed(3));
    ticking = false;
  }
  function onScroll() {
    if (nav && hero && !ticking) { window.requestAnimationFrame(apply); ticking = true; }
  }
  if (hero && nav) { window.addEventListener('scroll', onScroll, { passive: true }); apply(); }

  document.querySelectorAll('.links a').forEach(function (a) {
    a.addEventListener('click', function () { document.body.classList.remove('open'); });
  });

  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  els.forEach(function (e) { io.observe(e); });

  // Imaging-Lab request form -> compose a mailto to the lab manager (static, no backend).
  var form = document.getElementById('docForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var to = form.getAttribute('data-to');
      var subject = 'Inscription documentation request — ' + (f.name.value || '');
      var body =
        'Name: ' + (f.name.value || '') + '\n' +
        'Email: ' + (f.email.value || '') + '\n' +
        'Institution: ' + (f.institution.value || '') + '\n' +
        'Material / type: ' + (f.material.value || '') + '\n' +
        'Number of items: ' + (f.count.value || '') + '\n\n' +
        (f.message.value || '');
      window.location.href = 'mailto:' + encodeURIComponent(to) +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
