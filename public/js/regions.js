/* Regions page: State -> Region dropdowns, district table and search.
   Data comes from the Express API (/api/regions). The table markup mirrors what DataTables 1.11.5
   generates on the reference (paging/ordering/info disabled). */
(function () {
  'use strict';

  var stateSel = document.getElementById('State');
  var regionSel = document.getElementById('Region');
  var tbody = document.getElementById('zone');
  var table = document.getElementById('DataTables_Table_0');
  var search = document.querySelector('#DataTables_Table_0_filter input');
  if (!stateSel || !regionSel || !tbody || !table) return;

  // DataTables (autoWidth) measures each header cell's natural content width on init and pins it in px.
  table.querySelectorAll('thead th').forEach(function (th) {
    var cs = getComputedStyle(th);
    var w =
      th.getBoundingClientRect().width -
      parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) -
      parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
    th.style.width = w + 'px';
  });

  var data = [];
  var INITIAL_REGION = 3; // the reference page initially lists the Southern Region districts
  var region = '';
  var query = '';

  function option(value, label) {
    var o = document.createElement('option');
    o.value = value;
    o.textContent = label;
    return o;
  }

  function cell(text) {
    var td = document.createElement('td');
    td.textContent = text;
    return td;
  }

  function renderRows() {
    var parent = region ? Number(region) : INITIAL_REGION;
    var list = data.filter(function (d) { return d.parent_id === parent && d.district_coordinator; });
    var q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(function (r, i) {
        return (i + 1 + ' ' + r.name + ' ' + r.district_coordinator).toLowerCase().indexOf(q) !== -1;
      });
    }
    tbody.textContent = '';
    if (!list.length) {
      var tr = document.createElement('tr');
      tr.className = 'odd';
      var td = cell('No matching records found');
      td.colSpan = 3;
      td.className = 'dataTables_empty';
      td.vAlign = 'top';
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }
    list.forEach(function (r, i) {
      var tr = document.createElement('tr');
      tr.className = i % 2 ? 'even' : 'odd';
      tr.appendChild(cell(i + 1));
      tr.appendChild(cell(r.name));
      tr.appendChild(cell(r.district_coordinator));
      tbody.appendChild(tr);
    });
  }

  function fillRegions(stateId) {
    regionSel.textContent = '';
    // The reference shows "Select Region" initially and swaps in "Select state" once the state is cleared.
    regionSel.appendChild(option('', stateId ? 'Select Region' : 'Select state'));
    data
      .filter(function (d) { return stateId && d.parent_id === Number(stateId); })
      .forEach(function (r) { regionSel.appendChild(option(r.id, r.name)); });
  }

  stateSel.addEventListener('change', function () {
    region = '';
    fillRegions(stateSel.value);
    renderRows();
  });
  regionSel.addEventListener('change', function () {
    region = regionSel.value;
    renderRows();
  });
  if (search) {
    search.addEventListener('input', function () {
      query = search.value;
      renderRows();
    });
  }

  fetch('/api/regions')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (json) {
      data = json;
      // States are server-rendered already; refresh them from the API in case the data changes.
      stateSel.textContent = '';
      stateSel.appendChild(option('', 'Select State'));
      data.filter(function (d) { return d.parent_id === 0; }).forEach(function (s) { stateSel.appendChild(option(s.id, s.name)); });
    })
    .catch(function (err) {
      console.error('Could not load regions:', err);
    });
})();
