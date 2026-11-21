import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Team from './pages/Team.jsx';
import Business from './pages/Business.jsx';
import Centers from './pages/Centers.jsx';
import Regions from './pages/Regions.jsx';
import Gallery from './pages/Gallery.jsx';
import NgoRegister from './pages/NgoRegister.jsx';
import JoinForm from './pages/JoinForm.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Legal from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = 'Gcare';
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Map the reference site's .html URLs onto the app routes.
const legacy = {
  '/index.html': '/',
  '/team.html': '/team',
  '/prefered_areas.html': '/business',
  '/centers.html': '/centers',
  '/regions.html': '/regions',
  '/gallery.html': '/gallery',
  '/registerinvitation.html': '/ngo-register',
  '/joinform.html': '/ngo-register/join',
  '/dashboard.html': '/dashboard',
  '/terms_and_conditions.html': '/terms-and-conditions',
  '/privacy_policy.html': '/privacy-policy',
  '/refund_policy.html': '/refund-policy',
};

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/business" element={<Business />} />
        <Route path="/centers" element={<Centers />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/ngo-register" element={<NgoRegister />} />
        <Route path="/ngo-register/join" element={<JoinForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms-and-conditions" element={<Legal page="terms" />} />
        <Route path="/privacy-policy" element={<Legal page="privacy" />} />
        <Route path="/refund-policy" element={<Legal page="refund" />} />
        {Object.entries(legacy).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
