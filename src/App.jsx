import { useCode } from './hooks/useCode';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';

function App() {
  const { html, setHtml, css, setCss, js, setJs, fullCode } = useCode();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-2 flex flex-col">
      <div className="flex gap-2 flex-grow">
        <CodeEditor
          title="HTML"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="输入HTML代码..."
        />
        <CodeEditor
          title="CSS"
          value={css}
          onChange={(e) => setCss(e.target.value)}
          placeholder="输入CSS代码..."
        />
        <CodeEditor
          title="JavaScript"
          value={js}
          onChange={(e) => setJs(e.target.value)}
          placeholder="输入JavaScript代码..."
        />
      </div>

      <Preview code={fullCode} />
    </div>
  );
}

export default App;
