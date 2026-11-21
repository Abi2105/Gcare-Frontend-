import { Header } from '../components/Navbar.jsx';
import HtmlContent from '../components/HtmlContent.jsx';
import invitation from '../content/invitation.html?raw';

// Banner (div.bannerImg) sits inside the header section; the letter follows it.
const split = invitation.indexOf('<div class="container">\n<div class="row regContent">');
const banner = invitation.slice(0, split);
const letter = invitation.slice(split);

export default function NgoRegister() {
  return (
    <>
      <Header id="bannerpage">
        <HtmlContent html={banner} />
      </Header>
      <HtmlContent html={letter} />
    </>
  );
}
