import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css';

const languageMap = {
  HTML: languages.markup,
  CSS: languages.css,
  JavaScript: languages.javascript
};

export function CodeEditor({ title, value, onChange, placeholder }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col flex-1 bg-white dark:bg-gray-800 rounded shadow p-2 transition-all duration-300 ease-in-out ${isCollapsed ? 'flex-none w-10' : ''}`}>
      <div className={`flex ${isCollapsed ? 'flex-col h-full justify-between items-center py-1' : 'justify-between items-center mb-1'}`}>
        <h2 className={`${isCollapsed ? 'text-xs [writing-mode:vertical-lr]' : 'text-lg'} font-semibold text-gray-800 dark:text-gray-200`}>
          {isCollapsed ? title.split('').join(' ') : title}
        </h2>
        <button type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <span className={`inline-block transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden flex-grow flex flex-col h-full ${isCollapsed ? 'hidden' : 'flex'}`}>
        <div className="relative flex-grow">
          <Editor
            value={value}
            onValueChange={onChange}
            highlight={code => highlight(code, languageMap[title], title.toLowerCase())}
            padding={10}
            className="font-mono text-sm bg-gray-800 text-gray-100 rounded h-full border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}
