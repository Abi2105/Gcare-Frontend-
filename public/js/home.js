/* Home page: demo-video modal and the "Contact us" form. The banner carousels are run by Bootstrap's
   data API (data-bs-ride="carousel"), exactly as on the reference site. */
(function () {
  'use strict';

  // ----- Video modal (same markup/classes as jquery-modal-video, styled by /css/modal-video.min.css) -----
  function openVideo(videoId) {
    var modal = document.createElement('div');
    modal.className = 'modal-video';
    modal.tabIndex = -1;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'You just opened the modal video');
    modal.innerHTML =
      '<div class="modal-video-body"><div class="modal-video-inner">' +
      '<div class="modal-video-movie-wrap" style="padding-bottom:56.25%">' +
      '<button class="modal-video-close-btn" aria-label="Close the modal by clicking here"></button>' +
      '<iframe width="460" height="230" src="https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(videoId) +
      '?autoplay=1&amp;controls=1" frameborder="0" allowfullscreen tabindex="-1"' +
      ' allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture" title="G-Care demo video"></iframe>' +
      '</div></div></div>';

    function close() {
      document.removeEventListener('keydown', onKey);
      modal.classList.add('modal-video-close');
      setTimeout(function () { modal.remove(); }, 300);
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
    }
    modal.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.appendChild(modal);
    modal.focus();
  }

  document.querySelectorAll('.english-video, .tamil-video').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      openVideo(a.getAttribute('data-video-id'));
    });
  });

  // ----- Contact form (validation mirrors jQuery Validate on the reference; data goes to the Express API) -----
  var form = document.getElementById('getintouchForm');
  if (!form) return;
  var fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phonenum: document.getElementById('phonenum'),
  };
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // The reference blocks these characters in the number input.
  fields.phonenum.addEventListener('keydown', function (e) {
    if (['-', '+', 'e'].indexOf(e.key) !== -1) e.preventDefault();
  });

  function setError(key, message) {
    var input = fields[key];
    var label = document.getElementById(key + '-error');
    input.classList.toggle('error', !!message);
    if (!message) {
      if (label) label.remove();
      return;
    }
    if (!label) {
      label = document.createElement('label');
      label.id = key + '-error';
      label.className = 'error';
      label.htmlFor = key;
      input.insertAdjacentElement('afterend', label);
    }
    label.textContent = message;
  }

  function validate() {
    var errors = {};
    if (!fields.name.value.trim()) errors.name = 'This field is required.';
    if (!fields.email.value.trim()) errors.email = 'This field is required.';
    else if (!EMAIL.test(fields.email.value)) errors.email = 'Please enter a valid email address.';
    if (!fields.phonenum.value) errors.phonenum = 'This field is required.';
    Object.keys(fields).forEach(function (k) { setError(k, errors[k]); });
    return Object.keys(errors).length === 0;
  }

  Object.keys(fields).forEach(function (k) {
    fields[k].addEventListener('input', function () {
      if (document.getElementById(k + '-error')) setError(k, null);
    });
  });

  function showMessage(text, ok) {
    var wrap = form.querySelector('.form-wrapper');
    var msg = wrap.querySelector('.contact-status');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'contact-status text-center mb-0';
      wrap.appendChild(msg);
    }
    msg.classList.toggle('text-success', ok);
    msg.classList.toggle('text-danger', !ok);
    msg.textContent = text;
    clearTimeout(showMessage.t);
    showMessage.t = setTimeout(function () { msg.remove(); }, 4000);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var button = document.getElementById('submit-btn');
    button.disabled = true;
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fields.name.value, email: fields.email.value, mobile: fields.phonenum.value }),
    })
      .then(function (res) {
        return res.json().then(function (body) { return { ok: res.ok, body: body }; });
      })
      .then(function (r) {
        if (!r.ok) throw new Error(r.body.error || 'Submission failed');
        form.reset();
        showMessage('Thank you! We will get back to you shortly.', true);
      })
      .catch(function (err) {
        showMessage(err.message || 'Something went wrong. Please try again.', false);
      })
      .finally(function () { button.disabled = false; });
  });
})();
