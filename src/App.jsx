import { useGlobalUI } from './context/GlobalUIContext';
import { useCode } from './hooks/useCode';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { useState, useEffect, useMemo } from 'react';

function App() {
  const { html, setHtml, css, setCss, js, setJs, fullCode, generateShareLink } = useCode();
  const { showToast } = useGlobalUI();
  const [theme, setTheme] = useState(() => {
    // 检查本地存储中是否有用户偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    // 如果没有用户偏好，则使用系统偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 监听系统偏好变化
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // 只有在用户没有明确设置主题时才跟随系统
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // 初始检查
    handleChange(darkModeMediaQuery);

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 保存主题到本地存储并更新HTML元素的data-theme属性
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // 更新HTML元素的data-theme属性，以便我们的CSS选择器能正确工作
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div data-theme={theme} className="h-screen bg-base-300 flex flex-col overflow-hidden">
      {/* Header/Navbar */}
      <div className="flex items-center justify-between bg-base-100 shadow-sm px-4 py-2">
        <div className="text-xl font-bold text-primary">CodePencil</div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost"
            title={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {theme === 'dark' ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true" role="img">
                <title>切换到亮色模式</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true" role="img">
                <title>切换到暗色模式</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            }
          </button>
          <button
            type="button"
            onClick={() => {
              const link = generateShareLink();
              navigator.clipboard.writeText(link);
              showToast({ message: '分享链接已复制到剪贴板', type: 'success' });
            }}
            className="btn btn-sm btn-primary"
          >
            分享
          </button>
        </div>
      </div>

      {/* Main Content and Preview in flex layout */}
      <div className="flex flex-col gap-3 p-3 flex-1 overflow-hidden">
        <div className="flex flex-col gap-2 flex-1">
          <Preview
            code={generatePreviewCode(fullCode, theme === 'dark')}
            renderPreview={({ isCollapsed, children }) => (
              <div className="flex flex-col gap-2 flex-1">
                {/* Editors Row - 根据预览区域的收起状态动态调整flex比例 */}
                <div className={`flex flex-row gap-3 ${isCollapsed ? 'flex-1' : 'flex-1'}`}>
                  <CodeEditor
                    title="HTML"
                    value={html}
                    onChange={setHtml}
                    placeholder="输入HTML代码..."
                    icon="<>"
                  />
                  <CodeEditor
                    title="CSS"
                    value={css}
                    onChange={setCss}
                    placeholder="输入CSS代码..."
                    icon="#"
                  />
                  <CodeEditor
                    title="JavaScript"
                    value={js}
                    onChange={setJs}
                    placeholder="输入JavaScript代码..."
                    icon="()"
                  />
                </div>

                {/* Preview Row - 根据收起状态动态调整，收起时占用最小空间 */}
                <div className={`${isCollapsed ? 'flex-initial' : 'flex-1'}`}>
                  {children}
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-1 text-xs bg-base-300 text-base-content">
        <p className="text-xs">Made with ❤️ using React, Tailwind CSS & DaisyUI</p>
      </footer>
    </div>
  );
}

// 根据主题生成预览代码
function generatePreviewCode(code, isDarkMode) {
  if (!isDarkMode) return code;

  // 在暗色模式下，添加深色背景样式
  return code.replace('<style>', `<style>
    /* Dark Mode Styles */
    html, body {
      background-color: #121212 !important;
      color: #e0e0e0 !important;
    }
    a { color: #60a5fa !important; }
    code, pre { background-color: #2d2d2d !important; color: #f8f8f2 !important; }
  `);
}

export default App;
