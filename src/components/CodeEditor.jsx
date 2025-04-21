import { useState, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
// 导入两种主题，一种用于亮色模式，一种用于暗色模式
import 'prismjs/themes/prism-tomorrow.css'; // 暗色主题
import './prism-light.css'; // 亮色主题（我们将创建这个文件）

const languageMap = {
  HTML: languages.markup,
  CSS: languages.css,
  JavaScript: languages.javascript
};

const getEditorHeaderClass = (title) => {
  switch (title) {
    case 'HTML':
      return 'editor-header-html';
    case 'CSS':
      return 'editor-header-css';
    case 'JavaScript':
      return 'editor-header-javascript';
    default:
      return 'bg-primary';
  }
};

export function CodeEditor({ title, value, onChange, placeholder, icon }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState('light');
  const editorRef = useRef(null);
  const headerClass = getEditorHeaderClass(title);

  // 检测当前主题
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'dark' : 'light');
    };

    // 初始检查
    checkTheme();

    // 创建观察器监听data-theme属性变化
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // 不再需要监听主题变化来更新标题栏颜色，因为我们使用CSS变量

  return (
    <div
      ref={editorRef}
      className={
        isCollapsed
          ? `card h-full w-10 flex-none flex flex-col ${headerClass} shadow-md rounded-xl overflow-hidden relative transition-none ${isAnimating ? 'pointer-events-none' : ''}`
          : `card h-full flex-1 flex flex-col bg-base-100 editor-container shadow-md rounded-xl themed-element overflow-hidden relative transition-[width] duration-500 ease-in-out ${isAnimating ? 'pointer-events-none' : ''}`
      }
    >
      {/* 添加一个额外的背景层，确保圆角正确显示 */}
      {!isCollapsed && <div className="absolute inset-0 bg-base-200 -z-10 themed-element" />}

      <div className={`${headerClass} ${isCollapsed ? 'h-full' : 'h-10'} text-white p-2 flex items-center justify-between w-full transition-none`}>
        <div className="flex items-center gap-1">
          {isCollapsed ? (
            <div className="font-bold text-xs [writing-mode:vertical-lr] py-1 text-center w-full">{title}</div>
          ) : (
            <>
              <div className="font-bold text-sm">{icon}</div>
              <h2 className="font-bold text-sm">{title}</h2>
            </>
          )}
        </div>
        {!isCollapsed && (
          <button
            type="button"
            onClick={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setIsCollapsed(!isCollapsed);
                setTimeout(() => setIsAnimating(false), 500);
              }, 50);
            }}
            className="p-1 rounded-md text-white focus:outline-none focus:ring-0 transition-colors hover:bg-white/20 active:bg-white/30"
          >
            <span className="text-lg">▼</span>
          </button>
        )}
      </div>

      <div className={`card-body p-0 overflow-auto flex-1 bg-base-300 themed-element ${isCollapsed ? 'hidden' : 'flex'}`}>
        <div className={`h-full overflow-auto flex-1 prism-editor-wrapper ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
          <Editor
            value={value}
            onValueChange={onChange}
            highlight={code => {
              // 根据当前主题应用不同的高亮类
              const highlightedCode = highlight(code, languageMap[title], title.toLowerCase());
              return highlightedCode;
            }}
            padding={8}
            style={{
              height: '100%',
              backgroundColor: 'var(--editor-bg)',
              color: 'var(--editor-text)',
            }}
            className="h-full focus:outline-none"
            placeholder={placeholder}
            textareaClassName="focus:outline-none"
          />
        </div>
      </div>

      {isCollapsed && (
        <button
          type="button"
          onClick={() => {
            setIsAnimating(true);
            setTimeout(() => {
              setIsCollapsed(!isCollapsed);
              setTimeout(() => setIsAnimating(false), 500);
            }, 50);
          }}
          className="p-1 rounded-md text-white focus:outline-none focus:ring-0 transition-colors hover:bg-white/20 active:bg-white/30 mt-auto mb-2"
        >
          <span className="text-lg">▲</span>
        </button>
      )}
    </div>
  );
}
