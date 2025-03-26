import { useState } from 'react';
import { useCode } from './hooks/useCode';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { Toast } from './components/Toast';

function App() {
  const { html, setHtml, css, setCss, js, setJs, fullCode, generateShareLink } = useCode();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 p-2 flex flex-col">
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={() => {
            const link = generateShareLink();
            navigator.clipboard.writeText(link);
            setToastType('success');
            setToastMessage('分享链接已复制到剪贴板');
            setShowToast(true);
          }}
          className="btn btn-primary"
        >
          分享代码
        </button>
      </div>
      <div className="flex gap-2 flex-grow">
        <CodeEditor
          title="HTML"
          value={html}
          onChange={setHtml}
          placeholder="输入HTML代码..."
        />
        <CodeEditor
          title="CSS"
          value={css}
          onChange={setCss}
          placeholder="输入CSS代码..."
        />
        <CodeEditor
          title="JavaScript"
          value={js}
          onChange={setJs}
          placeholder="输入JavaScript代码..."
        />
      </div>

      <Preview code={fullCode} />

      <Toast visible={showToast} message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
    </div>
  );
}

export default App;
