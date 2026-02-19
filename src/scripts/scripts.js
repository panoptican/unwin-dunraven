// Site initialization
(function() {
  'use strict';

  var PIN_BREAKPOINT = 768;
  var RESIZE_DEBOUNCE_MS = 180;
  var controller = null;
  var scenes = [];
  var resizeTimeout = null;

  function isMobile() {
    return window.innerWidth <= PIN_BREAKPOINT;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function setCurrentYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function destroySectionPinning() {
    for (var i = 0; i < scenes.length; i++) {
      scenes[i].destroy(true);
    }

    scenes = [];

    if (controller) {
      controller.destroy(true);
      controller = null;
    }
  }

  function initSectionPinning() {
    if (isMobile() || prefersReducedMotion() || typeof ScrollMagic === 'undefined') {
      destroySectionPinning();
      return;
    }

    var sections = document.querySelectorAll('[data-pin="true"]');
    if (!sections.length) {
      destroySectionPinning();
      return;
    }

    destroySectionPinning();

    controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave'
      }
    });

    for (var i = 0; i < sections.length; i++) {
      var pinDuration = Math.max(sections[i].offsetHeight, window.innerHeight);

      var scene = new ScrollMagic.Scene({
        triggerElement: sections[i],
        duration: pinDuration
      })
        .setPin(sections[i])
        .addTo(controller);

      scenes.push(scene);
    }
  }

  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initSectionPinning, RESIZE_DEBOUNCE_MS);
  }

  function init() {
    setCurrentYear();
    initSectionPinning();

    window.addEventListener('resize', handleResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
