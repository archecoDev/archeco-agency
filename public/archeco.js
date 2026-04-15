/* ARCHECO - Shared JS */
(function () {
  'use strict';

  /* ── Cursor ────────────────────────────────── */
  var cd = document.getElementById('cur-d');
  var cr = document.getElementById('cur-r');
  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    cd.style.left = mx + 'px'; cd.style.top = my + 'px';
  });
  (function raf() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    cr.style.left = rx + 'px'; cr.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();
  document.querySelectorAll('a, button, [data-hover]').forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('hov'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('hov'); });
  });

  /* ── Nav ────────────────────────────────────── */
  var nav  = document.getElementById('nav');
  var hero = document.getElementById('hero') || document.querySelector('.page-hero') || document.querySelector('.s1');
  if (nav && hero) {
    function updateNav() {
      var past = hero.getBoundingClientRect().bottom < 20;
      nav.classList.toggle('on-light', past);
      if (!document.body.classList.contains('page-dark')) {
        document.body.classList.toggle('is-dark', !past);
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Scroll reveals ─────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .05 });
  document.querySelectorAll('.rv').forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight + 60) el.classList.add('in');
    else io.observe(el);
  });

  /* ── Counters ───────────────────────────────── */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, target = +el.dataset.cnt, suffix = el.dataset.sf || '', dur = 1400, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-cnt]').forEach(function (el) { cio.observe(el); });

  /* ── Carousel ───────────────────────────────── */
  document.querySelectorAll('.car-track').forEach(function (track) {
    var wrap  = track.closest('.car-wrap') || track.parentElement;
    var fill  = wrap.querySelector('.car-prog-fill');
    var btnN  = wrap.querySelector('.js-next');
    var btnP  = wrap.querySelector('.js-prev');
    var isDown = false, startX = 0, scrollL = 0;

    function syncFill() {
      var max = track.scrollWidth - track.clientWidth;
      if (fill && max) fill.style.width = (track.scrollLeft / max * 100) + '%';
    }
    track.addEventListener('mousedown', function (e) {
      isDown = true; startX = e.pageX - track.offsetLeft; scrollL = track.scrollLeft;
      track.classList.add('is-drag'); document.body.classList.add('drag');
    });
    document.addEventListener('mouseup', function () {
      isDown = false; track.classList.remove('is-drag'); document.body.classList.remove('drag');
    });
    document.addEventListener('mousemove', function (e) {
      if (!isDown) return; e.preventDefault();
      track.scrollLeft = scrollL - (e.pageX - track.offsetLeft - startX) * 1.55;
      syncFill();
    });
    track.addEventListener('scroll', syncFill, { passive: true });
    if (btnN) btnN.addEventListener('click', function () { track.scrollBy({ left: track.clientWidth * .65, behavior: 'smooth' }); });
    if (btnP) btnP.addEventListener('click', function () { track.scrollBy({ left: -track.clientWidth * .65, behavior: 'smooth' }); });
  });

  /* ── Filters ────────────────────────────────── */
  document.querySelectorAll('.team-filters').forEach(function (group) {
    var btns  = group.querySelectorAll('.team-filter');
    var items = document.querySelectorAll('.member');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.dataset.tf;
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        items.forEach(function (item) {
          var cats = (item.dataset.cats || '').split(' ');
          if (f === 'all' || cats.includes(f)) {
            item.style.display = '';
            item.classList.add('in'); // Ensure visible if were hidden
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });

  /* ── Lightbox ───────────────────────────────── */
  var lb = document.getElementById('lb');
  if (lb) {
    var lbi = lb.querySelector('img');
    document.getElementById('lb-x').addEventListener('click', function () { lb.classList.remove('open'); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
    document.querySelectorAll('[data-lb]').forEach(function (el) {
      el.addEventListener('click', function () {
        lbi.src = el.dataset.lb || el.querySelector('img').src;
        lb.classList.add('open');
      });
    });
  }

})();
