import { useState } from 'react';

const empty = { name: '', email: '', phonenum: '' };

// Mirrors jQuery Validate's behaviour on the reference form (required + email).
function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'This field is required.';
  if (!v.email.trim()) e.email = 'This field is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.';
  if (!v.phonenum) e.phonenum = 'This field is required.';
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // The reference posts to a private Google Apps Script endpoint; this local build does not send data anywhere.
    console.info('Contact form (local only):', { Name: values.name, Email: values.email, Mobile: values.phonenum });
    setValues(empty);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const err = (k) =>
    errors[k] ? (
      <label id={`${k}-error`} className="error" htmlFor={k}>
        {errors[k]}
      </label>
    ) : null;

  return (
    <section id="contact-us">
      <div className="contact-wrapper">
        <div className="container">
          <div className="contact-body">
            <label className="title">Contact us</label>
            <p className="d-none d-lg-block d-xl-none">
              Fill in your information and we will get back to you — or just give us a call: +(044) 4358 1373
            </p>
            <p className="d-none d-lg-block d-xl-none">
              Try our toll free no: 1800 2032 685 <span> Whatsapp No: +91 73059 11160</span>
            </p>
            <p>
              Fill in your information and we will get back to you <br />— or just give us a call: +(044) 4358 1373
            </p>
            <div className="row">
              <p className=" ">Try our toll free no: 1800 2032 685</p>
              <p className="">Whatsapp No: +91 73059 11160</p>
            </div>
          </div>
          <div className="form">
            <form id="getintouchForm" name="getintouchForm" noValidate onSubmit={submit}>
              <div className="form-wrapper row">
                <div className="row flex-column align-content-center">
                  <div className="col-12 col-lg-5 col-md-8">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input type="text" name="Name" className={`form-control${errors.name ? ' error' : ''}`} id="name" placeholder="Enter name" autoComplete="no" required value={values.name} onChange={set('name')} />
                      {err('name')}
                    </div>
                  </div>
                  <div className="col-12 col-lg-5 col-md-8">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        E-mail ID
                      </label>
                      <input type="email" name="email" className={`form-control${errors.email ? ' error' : ''}`} id="email" placeholder="Enter email id" autoComplete="no" required value={values.email} onChange={set('email')} />
                      {err('email')}
                    </div>
                  </div>
                  <div className="col-12 col-lg-5 col-md-8">
                    <div className="form-group">
                      <label htmlFor="phonenum" className="form-label">
                        Mobile No.
                      </label>
                      <input
                        type="number"
                        className={`form-control${errors.phonenum ? ' error' : ''}`}
                        id="phonenum"
                        placeholder="Enter Mobile No"
                        name="phone"
                        autoComplete="no"
                        maxLength="10"
                        minLength="10"
                        required
                        value={values.phonenum}
                        onKeyDown={(e) => ['-', '+', 'e'].includes(e.key) && e.preventDefault()}
                        onChange={set('phonenum')}
                      />
                      {err('phonenum')}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button id="submit-btn" type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                {sent && <p className="text-success text-center mb-0">Thank you! We will get back to you shortly.</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
