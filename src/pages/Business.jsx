import PageBanner from '../components/PageBanner.jsx';
import { preferredAreas } from '../data/site.js';

export default function Business() {
  return (
    <>
      <PageBanner title="Preferred Areas" />
      <section id="preference">
        <div className="container">
          {preferredAreas.map((a) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-6" key={a.label}>
              <div className="card">
                <img src={a.img} className="card-img-top" alt="" />
                <div className="card-body">
                  <p className="card-text">{a.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
