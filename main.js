/* ------------------------------------------------------------------
   背景パーティクル + スクロール表示
   面の光は置かない（blur の面はカードの backdrop-filter に取り込まれて
   四角く滲むため）。背景演出は点と線だけにしている。
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- particles */

  var canvas = document.getElementById('particles');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var COUNT = window.innerWidth < 640 ? 28 : 55;
    var LINK_DIST = 120;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0;
    var h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles = [];
      for (var i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: 1 + Math.random() * 2,
          a: 0.3 + Math.random() * 0.4
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 197, 253, ' + p.a + ')';
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(96, 165, 250, ' +
              (p.a * 0.5 * (1 - d / LINK_DIST)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    seed();
    if (reduceMotion) {
      // 動かさず1枚だけ描く
      var frozen = particles.map(function (p) { p.vx = 0; p.vy = 0; return p; });
      particles = frozen;
      ctx.clearRect(0, 0, w, h);
      draw();
    } else {
      draw();
    }

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        seed();
      }, 200);
    });
  }

  /* ------------------------------------------------------------ reveal */

  var targets = document.querySelectorAll('.card, .before-item, .section-head');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    return; // 既定で見えている（.reveal を付けない）
  }

  Array.prototype.forEach.call(targets, function (el) {
    el.classList.add('reveal');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
