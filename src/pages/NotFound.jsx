import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner.jsx';

export default function NotFound() {
  return (
    <>
      <PageBanner title="Page not found" />
      <section id="about">
        <div className="container text-center">
          <div className="content">
            <div className="sub-title_text">404</div>
            <p>The page you are looking for doesn’t exist.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
