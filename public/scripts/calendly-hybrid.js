/* Calendly hybrid loader: binds to elements and opens the popup widget safely. */
/* eslint-env browser */
(function () {
  'use strict';

  var CAL_URL_ATTRS = ['data-cal-url', 'data-calendly-url'];
  var SELECTOR = '[data-calendly="open"], [data-cal-open="true"], #calendlyBtn, .calendly-open';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function getCalendlyUrlFrom(el) {
    for (var i = 0; i < CAL_URL_ATTRS.length; i++) {
      var attr = CAL_URL_ATTRS[i];
      var val = el.getAttribute(attr);
      if (val) return val;
    }
    var href = el.getAttribute('href');
    return href || '';
  }

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = function () {
        resolve();
      };
      s.onerror = function (e) {
        reject(e);
      };
      document.head.appendChild(s);
    });
  }

  function openCalendly(url) {
    // If Calendly is available, open popup; otherwise navigate to URL.
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({ url: url });
      return;
    }
    if (url) window.location.href = url;
  }

  ready(function () {
    var targets = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
    if (targets.length === 0) return;

    targets.forEach(function (el) {
      el.addEventListener(
        'click',
        function (e) {
          var url = getCalendlyUrlFrom(el);
          if (!url) return;
          e.preventDefault();
          loadScriptOnce('https://assets.calendly.com/assets/external/widget.js')
            .then(function () {
              openCalendly(url);
            })
            .catch(function () {
              // Fallback: navigate directly
              window.location.href = url;
            });
        },
        { passive: false }
      );
    });
  });
})();
