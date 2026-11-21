/* NGO membership application form: validation, Bootstrap confirm modals / toasts,
   and multipart submission (including certificate files) to the Express API. */
(function () {
  'use strict';

  var form = document.getElementById('ngoForm');
  if (!form || !window.bootstrap) return;

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var errToastEl = document.getElementById('toastSubmit');
  var okToastEl = document.getElementById('successtoast');
  var submitModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('submitModal'));
  var cancelModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('cancelModal'));
  var errToastBody = errToastEl.querySelector('.toast-body');
  var errToastDefault = errToastBody.textContent;

  // Required fields are the ones whose label carries "required-field" (same as the reference markup).
  var requiredIds = Array.prototype.map.call(form.querySelectorAll('label.required-field'), function (l) {
    return l.htmlFor;
  });

  function fieldContainer(id) {
    var label = form.querySelector('label[for="' + id + '"]');
    return label ? label.parentElement : null;
  }

  function clearErrors() {
    form.querySelectorAll('label.error').forEach(function (l) { l.remove(); });
  }

  function addError(id, message) {
    var label = document.createElement('label');
    label.className = 'error';
    label.textContent = message;
    if (id === 'chkBox') {
      document.getElementById('chkboxError').appendChild(label);
      return;
    }
    label.htmlFor = id;
    var box = fieldContainer(id);
    if (box) box.appendChild(label);
  }

  function showErrorToast(text) {
    errToastBody.textContent = text || errToastDefault;
    bootstrap.Toast.getOrCreateInstance(errToastEl).show();
  }

  function validate() {
    clearErrors();
    var first = null;
    requiredIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var message = null;
      if (!el.value.trim()) message = 'This field is required.';
      else if (el.type === 'email' && !EMAIL.test(el.value)) message = 'Please enter a valid email address.';
      if (message) {
        addError(id, message);
        first = first || el;
      }
    });
    if (!document.getElementById('chkBox').checked) {
      addError('chkBox', 'Please accept the privacy policy');
      first = first || document.getElementById('chkBox');
    }
    return !first;
  }

  // Clear a field's error as soon as the user edits it.
  form.addEventListener('input', function (e) {
    var box = e.target.id === 'chkBox' ? document.getElementById('chkboxError') : fieldContainer(e.target.id);
    if (box) box.querySelectorAll('label.error').forEach(function (l) { l.remove(); });
  });

  document.getElementById('submitBtn').addEventListener('click', function () {
    if (!validate()) return showErrorToast();
    submitModal.show();
  });

  document.getElementById('cancelLink').addEventListener('click', function () {
    cancelModal.show();
  });

  document.querySelector('#cancelModal .btn-primary').addEventListener('click', function () {
    cancelModal.hide();
    location.href = '/ngo-register';
  });

  var yesBtn = document.querySelector('#submitModal .btn-primary');
  yesBtn.addEventListener('click', function () {
    // Send every field keyed by its id (some reference field names repeat, e.g. "State").
    var fd = new FormData();
    form.querySelectorAll('input[id], textarea[id]').forEach(function (el) {
      if (el.type === 'file') {
        if (el.files[0]) fd.append(el.id, el.files[0]);
      } else if (el.type === 'checkbox') {
        fd.append(el.id, el.checked ? 'yes' : 'no');
      } else {
        fd.append(el.id, el.value);
      }
    });

    yesBtn.disabled = true;
    fetch('/api/ngo-applications', { method: 'POST', body: fd })
      .then(function (res) {
        return res.json().then(function (body) { return { ok: res.ok, body: body }; });
      })
      .then(function (r) {
        if (!r.ok) throw new Error(r.body.error || 'Submission failed');
        submitModal.hide();
        form.reset();
        clearErrors();
        bootstrap.Toast.getOrCreateInstance(okToastEl).show();
      })
      .catch(function (err) {
        submitModal.hide();
        showErrorToast(err.message);
      })
      .finally(function () { yesBtn.disabled = false; });
  });
})();
