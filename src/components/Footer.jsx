import { Link, useLocation } from 'react-router-dom';

const quickLinks = [
  ['/#about-us', 'About us'],
  ['/business', 'Business'],
  ['/team', 'Our Teams'],
  ['/centers', 'Centers'],
  ['/gallery', 'Gallery'],
];
const legalLinks = [
  ['/terms-and-conditions', 'Terms of service'],
  ['/privacy-policy', 'Privacy policy'],
  ['/refund-policy', 'Refund Policy'],
];
const headOffice = 'No.32/50, Red Cross Road, Indian Red Cross Society Campus, Egmore, Chennai – 600 008.';
const regOffice = 'No. 33, Gandhipuram, Opp: Govt. Hospital, Thiruvallur – 602 001';

const links = (list) =>
  list.map(([to, label]) => (
    <Link key={to} to={to}>
      {label}
    </Link>
  ));

function AccordionItem({ id, title, open, children }) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${id}`}>
        <button
          className={`accordion-button${open ? ' collapsed' : ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${id}`}
          aria-expanded={open ? 'true' : 'false'}
          aria-controls={`collapse${id}`}
        >
          <p className="title">{title}</p>
        </button>
      </h2>
      <div id={`collapse${id}`} className={`accordion-collapse collapse${open ? ' show' : ''}`} aria-labelledby={`heading${id}`} data-bs-parent="#accordionFooter">
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}

// Only these reference pages show the (placeholder "#") social icons under the footer logo.
const socialRoutes = ['/regions', '/ngo-register', '/ngo-register/join'];

function Social() {
  return (
    <div className="d-flex social mt-5">
      {['fb', 'twitter', 'insta', 'linkedin', 'yt'].map((n) => (
        <a href="#" key={n} onClick={(e) => e.preventDefault()}>
          <img src={`/assets/${n}.png`} alt="" />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const social = socialRoutes.includes(pathname);
  return (
    <>
      <footer className="d-none d-sm-block">
        <div className="container footer">
          <div className="col-lg-3 col-md-3 col-sm-4 d-lg-none" style={{ marginBottom: 52 }}>
            <img src="/assets/white-logo.png" alt="logo" />
            {social && <Social />}
          </div>
          <div className="row no-gutters">
            <div className="col-lg-3 col-md-3 col-sm-4 d-md-none d-lg-block" style={{ marginBottom: 52 }}>
              <img src="/assets/white-logo.png" alt="logo" />
              {social && <Social />}
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3">
              <p className="title">Quick links</p>
              {links(quickLinks)}
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
              <p className="title">Legal</p>
              {links(legalLinks)}
            </div>
            <div className="col-lg-3 col-md-3 h-office">
              <p className="title">Head Office</p>
              <ul className="contactus">
                <li>{headOffice}</li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 r-office">
              <p className="title">Registered Office</p>
              <ul className="contactus">
                <li>{regOffice}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="privacy d-flex justify-content-center">
          <p className="copy">© 2021 – G-Care. All rights reserved.</p>
        </div>
      </footer>

      <section className="d-block d-sm-none  footer-mobile">
        <div className="container ">
          <div className="row ">
            <img className="logo" src="/assets/white-logo.png" alt="" />
            <div className="accordion" id="accordionFooter">
              {/* The reference renders "Quick links" expanded and marks the others with inverted collapsed classes. */}
              <AccordionItem id="Two" title="Quick links" open>
                {links(quickLinks)}
              </AccordionItem>
              <AccordionItem id="Three" title="Legal">
                {links(legalLinks)}
              </AccordionItem>
              <AccordionItem id="4" title="Head Office">
                <ul className="contactus">
                  <li>{headOffice}</li>
                </ul>
              </AccordionItem>
              <AccordionItem id="5" title="Registered Office">
                <ul className="contactus">
                  <li>{regOffice}</li>
                </ul>
              </AccordionItem>
            </div>
          </div>
        </div>
        <div className="privacy ">
          <p className="copy">© 2021 – G-Care. All rights reserved.</p>
        </div>
      </section>
    </>
  );
}
