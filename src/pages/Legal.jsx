import { Header } from '../components/Navbar.jsx';
import HtmlContent from '../components/HtmlContent.jsx';
import terms from '../content/terms.html?raw';
import privacy from '../content/privacy.html?raw';
import refund from '../content/refund.html?raw';

const pages = { terms, privacy, refund };

// The fragment contains the title bar (div#banner) followed by section#about, exactly as on the reference.
export default function Legal({ page }) {
  const [banner, body] = splitAtAbout(pages[page]);
  return (
    <>
      <Header compactNav>
        <HtmlContent html={banner} />
      </Header>
      <HtmlContent html={body} />
    </>
  );
}

function splitAtAbout(html) {
  const i = html.indexOf('<section id="about"');
  return [html.slice(0, i), html.slice(i)];
}
