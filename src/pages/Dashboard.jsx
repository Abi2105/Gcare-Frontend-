import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner.jsx';

// dashboard.html on the reference site is behind HTTP authentication (401), so it is not reproduced.
export default function Dashboard() {
  return (
    <>
      <PageBanner title="Dashboard" />
      <section id="about">
        <div className="container text-center">
          <div className="content">
            <div className="sub-title_text">Unauthorized</div>
            <p>This area requires authorized access.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
