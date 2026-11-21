/* Gallery & Centers: lightgallery.js on each thumbnail container, as on the reference
   (lightGallery(document.getElementById(id)) for "animated-thumbnails-gallery" and "animated").
   The Chennai / Pondicherry tabs use Bootstrap's data API (data-bs-toggle="pill"). */
(function () {
  'use strict';
  if (typeof window.lightGallery !== 'function') return;
  ['animated-thumbnails-gallery', 'animated'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) window.lightGallery(el);
  });
})();
