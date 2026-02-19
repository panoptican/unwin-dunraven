// Triangle background animation
// Based on work by Larry A. Williamson (http://codepen.io/lawrencealan/pen/dJuao)

(function() {
  'use strict';

  var canvas = null;
  var ctx = null;
  var animationId = null;
  var resizeTimeout = null;
  var iteration = 0;

  var config = {
    unitSize: 64,
    rows: 0,
    cols: 0,
    maxIterations: 100,
    trianglesPerFrame: 8
  };

  // Detect if user prefers reduced motion
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Check if device is mobile (for performance adjustments)
  function isMobile() {
    return window.innerWidth <= 768;
  }

  function init() {
    var coverSection = document.getElementById('cover-section');
    if (!coverSection) return;

    // Clean up existing canvas and animation
    cleanup();

    var width = coverSection.offsetWidth;
    var height = coverSection.offsetHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    coverSection.appendChild(canvas);

    config.rows = Math.ceil(height / config.unitSize);
    config.cols = Math.ceil(width / config.unitSize);

    // Reduce iterations on mobile or if user prefers reduced motion
    if (prefersReducedMotion()) {
      config.maxIterations = 1;
      config.trianglesPerFrame = 50;
    } else if (isMobile()) {
      config.maxIterations = 40;
      config.trianglesPerFrame = 6;
    } else {
      config.maxIterations = 100;
      config.trianglesPerFrame = 8;
    }

    iteration = 0;
    animate();
  }

  function cleanup() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    canvas = null;
    ctx = null;
  }

  function animate() {
    if (iteration >= config.maxIterations || !ctx) {
      return;
    }

    // Draw multiple triangles per frame for efficiency
    for (var i = 0; i < config.trianglesPerFrame; i++) {
      var c = Math.floor(Math.random() * config.cols);
      var r = Math.floor(Math.random() * config.rows);
      var x = c * config.unitSize + (r % 2 ? config.unitSize * 0.5 : 0);
      var y = r * config.unitSize;
      drawTriangle(x, y);
    }

    iteration++;
    animationId = requestAnimationFrame(animate);
  }

  function drawTriangle(x, y) {
    var color = randomColor({ hue: 'monochrome', luminosity: 'dark' });
    var size = config.unitSize * Math.ceil(Math.random() * 8);
    var top = y - size * 0.5;
    var bottom = top + size * 0.85;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x + size * 0.5, top);
    ctx.lineTo(x + size, bottom);
    ctx.lineTo(x, bottom);
    ctx.fill();
  }

  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(init, 150);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Debounced resize handler
  window.addEventListener('resize', handleResize);
})();
