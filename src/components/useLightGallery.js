import { useEffect, useRef } from 'react';

/** Initialises lightgallery.js (loaded globally from /vendor, as on the reference site) on a container. */
export default function useLightGallery() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window.lightGallery !== 'function') return;
    window.lightGallery(el);
    return () => {
      const uid = el.getAttribute('lg-uid');
      if (uid && window.lgData?.[uid]) window.lgData[uid].destroy(true);
    };
  }, []);
  return ref;
}
