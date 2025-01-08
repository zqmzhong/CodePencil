import { useState } from 'react';

export function useCode() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  const fullCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
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
