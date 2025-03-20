import { useState } from 'react';

export function Preview({ code }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`mt-2 bg-white dark:bg-gray-800 rounded-lg shadow p-2 transition-all duration-300 ease-in-out ${isCollapsed ? 'h-16' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">实时预览</h2>
        <button type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <span className={`inline-block transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'h-0 opacity-0' : 'opacity-100'}`}>
        <iframe
          className="w-full h-96 border rounded"
          srcDoc={code}
          sandbox="allow-scripts allow-same-origin"
          title="实时预览"
        />
      </div>
    </div>
  );
}
