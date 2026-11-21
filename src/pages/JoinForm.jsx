import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'bootstrap/js/dist/modal';
import Toast from 'bootstrap/js/dist/toast';
import { Header } from '../components/Navbar.jsx';
import useBootstrap4 from '../components/useBootstrap4.js';

// [id, name, label, type, inputClass, labelRequired]
const f = (id, name, label, type = 'text', cls = 'inputBox', req = false, extra = {}) => ({ id, name, label, type, cls, req, extra });

// Layout mirrors joinform.html: each section is a row with optional full-width fields and two columns.
const sections = [
  {
    title: 'About Organization',
    cls: 'aboutOrg',
    cols: [
      [
        f('nameOfOrganisation', 'Name_Of_Organisation', 'Name of the Organization/Trust/Society', 'text', 'inputBox', true),
        f('registrationNumber', 'Registration_Number', 'Registration Number', 'text', 'inputBox', true),
        f('dateOfRegistration', 'Date_of_Registration', 'Date of Registration', 'date', 'inputBox', true),
      ],
      [
        f('yearOfEstablishment', 'Year_Of_Establishment', 'Year of Establishment', 'text', 'inputBox', true),
        f('registrationAct', 'Registration_under_which_Act', 'Registration under which Act', 'text', 'inputBox', true),
        f('nitiAyogRegNo', 'NITI-AYOG_Registration_No_Date', 'NITI-AYOG Registration No. & Date', 'text', 'inputBox', true),
      ],
    ],
  },
  {
    title: 'Certification Details',
    cols: [
      [
        f('gstNo', 'GST_Number_if_available', 'GST Number, if available'),
        f('12aCertificate', '12aCertificate', '12 A Certificate Details, if available', 'file', 'inputBox', true),
        f('msmeCertificate', 'msmeCertificate', 'MSME Certification, if any', 'file', 'inputBox', true),
      ],
      [
        f('gCertificate', 'Certificate_From_Income_Tax', '80 G Certificate from Income Tax Dept.', 'file', 'inputBox', true),
        f('fcraCertificate', 'fcraCertificate', 'FCRA Certification details, if available', 'file', 'inputBox', true),
      ],
    ],
  },
  {
    title: 'Register Postal Address',
    before: [f('street', 'Street', 'Street', 'text', 'inputLong')],
    cols: [[f('state', 'State', 'State'), f('pincode', 'Pincode', 'Pincode')], [f('country', 'Country', 'Country')]],
  },
  {
    title: 'Contact Details',
    cols: [
      [
        f('chiefFunctionary', 'Name_of_the_Chief_Functionary', 'Name of the Chief Functionary', 'text', 'inputBox', true),
        f('email', 'Email', 'Email', 'email', 'inputBox', true),
        f('detailAboutMembers', 'Members_of_your_Organization', 'Details about the other Members of your Organization/Trust/Society'),
      ],
      [f('designation', 'designation', 'Designation'), f('phone', 'Phone', 'Phone', 'text', 'inputBox', false, { minLength: 10, maxLength: 10 })],
    ],
  },
  {
    title: 'SPOC Details',
    cols: [
      [
        f('nameOfSpoc', 'Name_of_the_SPOC', 'Name of the SPOC person to liaison with GCC', 'text', 'inputBox', true),
        f('spocMobileNumber', 'Mobile_Number', 'Mobile Number', 'text', 'inputBox', true, { minLength: 10, maxLength: 13 }),
      ],
      [f('spocEmail', 'Email_ID', 'Email ID', 'email', 'inputBox', true), f('website', 'Website', 'Website')],
    ],
    after: [
      f('introAboutNgo', 'Brief_Introduction', 'Brief Introduction about your NGO', 'textarea', 'inputLong2'),
      f('noteOnPrevProject', 'project_implementation', 'Give a note on your previous projects and your role in the project implementation', 'textarea', 'inputLong3'),
      f('ongoingProject', 'Details_about_the_ongoing_projects', 'Details about the on-going projects, if any', 'textarea', 'inputLong4'),
    ],
  },
  {
    title: 'Operational Area Details',
    before: [f('thematicArea', 'Thematic_Area', 'Thematic Area', 'text', 'inputLong')],
    cols: [
      [f('areaOfOperation', 'Area_of_operation', 'Area of operation (Block/District)'), f('district', 'District', 'District'), f('block', 'Block', 'Block')],
      [f('operationalState', 'State', 'State'), f('taluk', 'Taluk', 'Taluk')],
    ],
  },
];

const requiredIds = sections.flatMap((s) => [...(s.before || []), ...s.cols.flat(), ...(s.after || [])]).filter((x) => x.req).map((x) => x.id);

export default function JoinForm() {
  useBootstrap4();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const refs = { submitModal: useRef(null), cancelModal: useRef(null), errToast: useRef(null), okToast: useRef(null) };
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const els = Object.values(refs).map((r) => r.current);
    return () =>
      els.forEach((el) => {
        Modal.getInstance(el)?.dispose();
        Toast.getInstance(el)?.dispose();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modal = (r) => Modal.getOrCreateInstance(r.current);
  const toast = (r) => Toast.getOrCreateInstance(r.current).show();

  const onSubmit = () => {
    const form = formRef.current;
    const errs = {};
    for (const id of requiredIds) {
      const el = form.querySelector(`[id="${id}"]`);
      if (!el.value.trim()) errs[id] = 'This field is required.';
      else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) errs[id] = 'Please enter a valid email address.';
    }
    if (!form.querySelector('#chkBox').checked) errs.chkBox = 'Please accept the privacy policy';
    setErrors(errs);
    if (Object.keys(errs).length) return toast(refs.errToast);
    modal(refs.submitModal).show();
  };

  const onConfirm = () => {
    // Local build: the reference uploads to a private backend; nothing is sent from here.
    const data = Object.fromEntries(new FormData(formRef.current).entries());
    console.info('NGO membership application (local only):', data);
    modal(refs.submitModal).hide();
    formRef.current.reset();
    toast(refs.okToast);
  };

  const field = (x) => (
    <div className="" key={x.id}>
      <label htmlFor={x.id} className={`form-label labelName${x.req ? ' required-field' : ''}`}>
        {x.label}
      </label>
      {x.type === 'textarea' ? (
        <textarea className={`form-control ${x.cls}`} name={x.name} id={x.id} placeholder="Enter" />
      ) : x.type === 'file' ? (
        <div>
          <input className={`form-control ${x.cls}`} name={x.name} type="file" id={x.id} />
        </div>
      ) : (
        <input type={x.type} name={x.name} className={`form-control ${x.cls}`} id={x.id} placeholder="Enter" {...x.extra} />
      )}
      {errors[x.id] && (
        <label className="error" htmlFor={x.id}>
          {errors[x.id]}
        </label>
      )}
    </div>
  );

  const toastEl = (r, id, bg, text) => (
    <div className="toast-msg-submit toastSubmit">
      <div ref={r} id={id} className={`toast align-items-center toastMsg text-white ${bg} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex justify-content-between align-items-center">
          <div className="toast-body">{text}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto " data-bs-dismiss="toast" aria-label="Close" />
        </div>
      </div>
    </div>
  );

  const confirmModal = (r, id, text, onYes) => (
    <div className="modal" id={id} tabIndex="-1" ref={r}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <p>{text}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              No
            </button>
            <button type="button" className="btn btn-primary" onClick={onYes}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header id="bannerpage" ulClass="navbar-nav mt-2 mt-lg-0">
        <div className="formBanner">
          <div className="container">
            <div className="row formHead ">
              <h3>G-Care Council</h3>
              <h3>Membership Application Form</h3>
            </div>
          </div>
        </div>
      </Header>
      {toastEl(refs.errToast, 'toastSubmit', 'bg-danger', 'Please Fill The Details')}
      {toastEl(refs.okToast, 'successtoast', 'bg-success', 'Data added successfully')}
      <div className="container">
        <form id="ngoForm" ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
          {sections.map((s) => (
            <div className={`aboutForm row${s.cls ? ` ${s.cls}` : ''}`} key={s.title}>
              <h5>{s.title}</h5>
              {(s.before || []).map(field)}
              {s.cols.map((col, i) => (
                <div className="col-lg-6 col-12" key={i}>
                  {col.map(field)}
                </div>
              ))}
              {(s.after || []).map(field)}
            </div>
          ))}
          <div className="aboutForm row declaration">
            <h5>Declaration</h5>
            <p>
              We declare that the information furnished above are true and correct to the best of our knowledge and belief and
              we agreed to abide by the rules and regulations of the G-Care Council, mentioned in the terms and conditions
              sheet.
            </p>
            <div className="form-check privacyCheck">
              <input className="form-check-input" type="checkbox" name="chkBox" value="" id="chkBox" />
              <div>
                <label className="form-check-label" htmlFor="chkBox">
                  I agree to the G-Care <Link to="/privacy-policy">Privacy Policy.</Link>
                </label>
              </div>
              <div id="chkboxError">{errors.chkBox && <label className="error">{errors.chkBox}</label>}</div>
            </div>
            <div>
              <button type="button" className="btn btn-primary submitBtn" id="submitBtn" onClick={onSubmit}>
                Submit
              </button>
              <a type="button" className="cancel" id="cancelLink" onClick={() => modal(refs.cancelModal).show()}>
                Cancel
              </a>
            </div>
            <p className="noteNB">
              NB: The application should be submitted to the council along with the soft copies of the documents viz., Trust
              Deed, 80-G Certificate, 12-A Certificate, Pan Card, GST Certificate, MSME, NITI AYOG, FCRA, Affiliation
              Certificates, if any with other federation, Testimonials, if any, etc.,
            </p>
          </div>
        </form>
      </div>
      {confirmModal(refs.submitModal, 'submitModal', 'Do you want to Submit ?', onConfirm)}
      {confirmModal(refs.cancelModal, 'cancelModal', 'Do you want to Cancel ?', () => {
        modal(refs.cancelModal).hide();
        navigate('/ngo-register');
      })}
    </>
  );
}
