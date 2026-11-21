import PageBanner from '../components/PageBanner.jsx';
import PhotoTabs, { ImageGrid } from '../components/PhotoTabs.jsx';
import galleries from '../data/galleries.json';

export default function Gallery() {
  return (
    <>
      <PageBanner title="Gallery" />
      <PhotoTabs
        active="chennai"
        panes={{
          chennai: <ImageGrid id="animated-thumbnails-gallery" images={galleries.gallery.chennai} />,
          pondicherry: <ImageGrid id="animated" images={galleries.gallery.pondicherry} />,
        }}
      />
    </>
  );
}
