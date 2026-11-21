import PageBanner from '../components/PageBanner.jsx';
import PhotoTabs, { CenterGrid, ImageGrid } from '../components/PhotoTabs.jsx';
import HtmlContent from '../components/HtmlContent.jsx';
import galleries from '../data/galleries.json';
import commercial from '../content/commercial.html?raw';

// As on the reference: the Chennai tab is disabled and Pondicherry centres are shown with captions,
// followed by the Commercial Module / Social Domain accordions.
export default function Centers() {
  return (
    <>
      <PageBanner title="Centers" />
      <PhotoTabs
        active="pondicherry"
        disabled={['chennai']}
        panes={{
          chennai: <ImageGrid id="animated-thumbnails-gallery" images={galleries.centers.chennai} />,
          pondicherry: <CenterGrid id="animated" centers={galleries.centers.pondicherry} />,
        }}
      />
      <HtmlContent html={commercial} />
    </>
  );
}
