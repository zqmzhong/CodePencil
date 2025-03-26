import { useDebounce } from 'ahooks';
import { useState, useEffect } from 'react';

export function useCode() {
  const [html, setHtml] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedCode = urlParams.get('code');
      if (sharedCode) {
        const decoded = atob(sharedCode);
        const { h, c, j } = JSON.parse(decoded);
        return h || JSON.parse(localStorage.getItem('code-html')) || '';
      }
      return JSON.parse(localStorage.getItem('code-html')) || '';
    } catch {
      return '';
    }
  });
  const [css, setCss] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedCode = urlParams.get('code');
      if (sharedCode) {
        const decoded = atob(sharedCode);
        const { h, c, j } = JSON.parse(decoded);
        return c || JSON.parse(localStorage.getItem('code-css')) || '';
      }
      return JSON.parse(localStorage.getItem('code-css')) || '';
    } catch {
      return '';
    }
  });
  const [js, setJs] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedCode = urlParams.get('code');
      if (sharedCode) {
        const decoded = atob(sharedCode);
        const { h, c, j } = JSON.parse(decoded);
        return j || JSON.parse(localStorage.getItem('code-js')) || '';
      }
      return JSON.parse(localStorage.getItem('code-js')) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    localStorage.setItem('code-html', JSON.stringify(html));
  }, [html]);

  useEffect(() => {
    localStorage.setItem('code-css', JSON.stringify(css));
  }, [css]);

  useEffect(() => {
    localStorage.setItem('code-js', JSON.stringify(js));
  }, [js]);
  const debouncedJs = useDebounce(js);

  const fullCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${debouncedJs}</script>
      </body>
    </html>
  `;

  const generateShareLink = () => {
    const codeData = { h: html, c: css, j: js };
    const encoded = btoa(JSON.stringify(codeData));
    return `${window.location.origin}${window.location.pathname}?code=${encoded}`;
  };

  return {
    html,
    setHtml,
    css,
    setCss,
    js,
    setJs,
    fullCode,
    generateShareLink
  };
}

