import { useNavigate } from 'react-router-dom';

/**
 * Renders static markup taken from the reference site's public pages (bundled locally from src/content).
 * Internal links are routed client-side.
 */
export default function HtmlContent({ html }) {
  const navigate = useNavigate();
  const onClick = (e) => {
    const a = e.target.closest('a[href]');
    const href = a?.getAttribute('href');
    if (href && href.startsWith('/') && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      navigate(href);
    }
  };
  return <div style={{ display: 'contents' }} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
