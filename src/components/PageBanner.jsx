import { Header } from './Navbar.jsx';

/** Standard subpage header from the reference: nav + blue title bar. */
export default function PageBanner({ title, compactNav = false }) {
  return (
    <Header compactNav={compactNav}>
      <div id="banner">
        <div className="title_bar">
          <h2 className="title_text">{title}</h2>
        </div>
      </div>
    </Header>
  );
}
