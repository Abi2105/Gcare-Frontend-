import { useEffect } from 'react';

/**
 * joinform.html on the reference loads Bootstrap 4.0.0 after Bootstrap 5.1.3 (and before style.css).
 * (Its Bootstrap 4.3.1 link fails the browser's integrity check, so it never applies; the invitation
 * page therefore effectively uses Bootstrap 5 only.) Reproduce the effective cascade while mounted.
 */
export default function useBootstrap4() {
  useEffect(() => {
    const style = document.getElementById('ref-style');
    if (!style) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = '/vendor/bootstrap/bootstrap-4.0.0.min.css';
    style.parentNode.insertBefore(l, style);
    return () => l.remove();
  }, []);
}
