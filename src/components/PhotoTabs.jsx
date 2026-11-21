import { Fragment } from 'react';
import useLightGallery from './useLightGallery.js';

export function ImageGrid({ id, images }) {
  const ref = useLightGallery();
  return (
    <div className="gallery-container text-lg-center" id={id} ref={ref}>
      {/* Whitespace around the inline anchors is intentional: it reproduces the gaps between thumbnails on the reference. */}
      {images.map((src) => (
        <Fragment key={src}>
          {' '}
          <a className="gallery-item" data-src={src}>
            {' '}
            <img alt="layers of blue." className="img-responsive" src={src} />{' '}
          </a>
        </Fragment>
      ))}{' '}
    </div>
  );
}

export function CenterGrid({ id, centers }) {
  const ref = useLightGallery();
  return (
    <div className="gallery-container text-lg-center centers row col-12" id={id} ref={ref}>
      {centers.map((c) => (
        <div className="center-wrapper col-lg-2 col-md-3 col-5" data-src={c.src} key={c.src}>
          <a className="gallery-item">
            <img alt="layers of blue." className="img-responsive" src={c.src} />
          </a>
          <p>{c.name}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Chennai / Pondicherry pill tabs with Bootstrap's tab plugin (data-bs-toggle="pill"), as on the reference.
 * active: which tab starts active; disabled: tab keys that are disabled.
 */
export default function PhotoTabs({ active, disabled = [], panes }) {
  const tabs = [
    ['chennai', 'Chennai'],
    ['pondicherry', 'Pondicherry'],
  ];
  return (
    <section id="gallary">
      <div className="container">
        <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
          {tabs.map(([key, label]) => (
            <li className="nav-item" role="presentation" key={key}>
              <button
                className={`nav-link${active === key ? ' active' : ''}`}
                id={`${key}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#${key}`}
                type="button"
                role="tab"
                aria-controls={key}
                aria-selected={active === key}
                disabled={disabled.includes(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {tabs.map(([key]) => (
            <div className={`tab-pane fade${active === key ? ' show active' : ''}`} id={key} role="tabpanel" aria-labelledby={`${key}-tab`} key={key}>
              <div className="col col-md-12">{panes[key]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
