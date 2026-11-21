import PageBanner from '../components/PageBanner.jsx';
import { doctors } from '../data/site.js';

// The live Team page shows only the doctors grid (the core-team block is commented out there).
const rows = [];
for (let i = 0; i < doctors.length; i += 6) rows.push(doctors.slice(i, i + 6));

export default function Team() {
  return (
    <>
      <PageBanner title="Our Team" />
      <section id="doctor">
        <div className=" container team-wrapper">
          {rows.map((row, r) => (
            <div className=" row team-img text-center " key={r}>
              {row.map((d) => (
                <div className="col-lg-2 col-6 col-md-4" key={d.name}>
                  <img src={d.img} alt="" />
                  <br />
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
