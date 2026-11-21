import { useEffect, useState } from 'react';

// Same markup/classes as jquery-modal-video used by the reference site (styled by /css/modal-video.min.css).
export default function VideoModal({ videoId, onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!videoId) return;
    setClosing(false);
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  if (!videoId) return null;
  return (
    <div className={`modal-video ${closing ? 'modal-video-close' : ''}`} tabIndex="-1" role="dialog" aria-label="You just opened the modal video" onClick={close}>
      <div className="modal-video-body">
        <div className="modal-video-inner">
          <div className="modal-video-movie-wrap" style={{ paddingBottom: '56.25%' }}>
            <button className="modal-video-close-btn" aria-label="Close the modal by clicking here" onClick={close} />
            <iframe
              width="460"
              height="230"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1`}
              frameBorder="0"
              allowFullScreen
              tabIndex="-1"
              allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture"
              title="G-Care demo video"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
