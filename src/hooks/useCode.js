import { useDebounce } from 'ahooks';
import { useState, useEffect } from 'react';

export function useCode() {
  const [html, setHtml] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('code-html')) || '';
    } catch {
      return '';
    }
  });
  const [css, setCss] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('code-css')) || '';
    } catch {
      return '';
    }
  });
  const [js, setJs] = useState(() => {
    try {
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

  return {
    html,
    setHtml,
    css,
    setCss,
    js,
    setJs,
    fullCode
  };
}

