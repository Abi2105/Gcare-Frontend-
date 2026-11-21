import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks, sideNavLinks } from '../data/site.js';

/** Header section wrapper used by every reference page: <section id=...> nav + banner </section> */
export function Header({ id, compactNav = false, ulClass, children }) {
  return (
    <section id={id}>
      <Navbar links={compactNav ? undefined : navLinks} compact={compactNav} ulClass={ulClass} />
      {children}
    </section>
  );
}

export default function Navbar({ links = navLinks, compact = false, ulClass = "navbar-nav mr-auto mt-2 mt-lg-0" }) {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const items = compact ? navLinks.filter((l) => ['Home', 'About us', 'Team', 'Business', 'Centers', 'Gallery'].includes(l.label)) : links;

  const isActive = (to) => {
    const [p, h] = to.split('#');
    if (h) return pathname === '/' && hash === `#${h}`;
    if (p === '/') return pathname === '/' && hash !== '#about-us';
    return pathname === p || (p === '/ngo-register' && pathname.startsWith(p));
  };

  const close = () => setOpen(false);

  return (
    <div className=" nav-wrapper menu container">
      <nav className="navbar fixed-top navbar-expand-lg navbar-expand-md navbar-light bg-light">
        <div id="mySidenav" className="sidenav" style={{ width: open ? '100%' : '0' }}>
          <a className="closebtn" role="button" tabIndex={0} onClick={close}>
            &times;
          </a>
          {sideNavLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={close}>
              {l.label}{' '}
            </Link>
          ))}
        </div>
        <div className=" mobile-menu-wrapper d-flex">
          <div className="mobile-menu d-block d-sm-none">
            <span className="bar" role="button" aria-label="Open menu" onClick={() => setOpen(true)}>
              <img src="/assets/black-bar.png" alt="" />
            </span>
            <div className="logo">
              <Link className="navbar-brand" to="/">
                <img src="/assets/logo.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
        <div className="logo d-none d-sm-block">
          <Link className="navbar-brand" to="/">
            <img src="/assets/logo.png" alt="" />
          </Link>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
          <ul className={ulClass}>
            {items.map((l) => (
              <li className="nav-item" key={l.to}>
                <Link className={`nav-link${isActive(l.to) ? ' active' : ''}`} to={l.to}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
