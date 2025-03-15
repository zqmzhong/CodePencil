import { useDebounce } from 'ahooks';
import { useState } from 'react';

export function useCode() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
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
