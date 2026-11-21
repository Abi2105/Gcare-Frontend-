import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import PageBanner from '../components/PageBanner.jsx';
import data from '../data/regions.json';

const states = data.filter((d) => d.parent_id === 0);
// The reference page initially lists these three districts (Southern Region).
const initialRows = data.filter((d) => d.parent_id === 3 && d.district_coordinator);

export default function Regions() {
  const [state, setState] = useState('');
  const [region, setRegion] = useState('');
  const [query, setQuery] = useState('');
  // Reference shows 'Select Region' until a state is chosen and then cleared (its script swaps in 'Select state').
  const [touched, setTouched] = useState(false);

  // DataTables (autoWidth) measures each header cell's natural content width on init and pins it in px.
  const tableRef = useRef(null);
  const [colWidths, setColWidths] = useState(null);
  useLayoutEffect(() => {
    const ths = [...tableRef.current.querySelectorAll('thead th')];
    setColWidths(ths.map((th) => {
      const cs = getComputedStyle(th);
      return th.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
    }));
  }, []);
  const thStyle = (i) => (colWidths ? { width: `${colWidths[i]}px` } : undefined);

  const regions = useMemo(() => (state ? data.filter((d) => d.parent_id === Number(state)) : []), [state]);

  const rows = useMemo(() => {
    const list = region ? data.filter((d) => d.parent_id === Number(region) && d.district_coordinator) : initialRows;
    const q = query.trim().toLowerCase();
    return q ? list.filter((r, i) => `${i + 1} ${r.name} ${r.district_coordinator}`.toLowerCase().includes(q)) : list;
  }, [region, query]);

  return (
    <>
      <PageBanner title="Regions" />
      <section id="gallary" className="reginon">
        <div className="container">
          <div className="table-wrapper">
            <div className="table-dropdown-wrapper d-flex">
              <div className="table-dropdown col-lg-3 col-5">
                <select
                  name="State"
                  id="State"
                  className="form-select"
                  aria-label="Default select example"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setRegion('');
                    setTouched(true);
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="table-dropdown col-lg-3 col-5">
                <select name="Region" id="Region" className="form-select" aria-label="Default select example" value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="">{state || !touched ? 'Select Region' : 'Select state'}</option>
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div className="col col-md-12">
              {/* Same DOM DataTables 1.11.5 generates on the reference (paging/ordering/info disabled). */}
              <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer">
                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                  <label>
                    <input type="search" className="" placeholder="" aria-controls="DataTables_Table_0" value={query} onChange={(e) => setQuery(e.target.value)} />
                  </label>
                </div>
                <table ref={tableRef} className="example dataTable no-footer" id="DataTables_Table_0" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th className="sorting_disabled" rowSpan="1" colSpan="1" style={thStyle(0)}>S.No</th>
                      <th className="sorting_disabled" rowSpan="1" colSpan="1" style={thStyle(1)}>District</th>
                      <th className="sorting_disabled" rowSpan="1" colSpan="1" style={thStyle(2)}>Coordinator Name</th>
                    </tr>
                  </thead>
                  <tbody id="zone">
                    {rows.length ? (
                      rows.map((r, i) => (
                        <tr key={r.id} className={i % 2 ? 'even' : 'odd'}>
                          <td>{i + 1}</td>
                          <td>{r.name}</td>
                          <td>{r.district_coordinator}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="odd">
                        <td colSpan="3" className="dataTables_empty" valign="top">
                          No matching records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
