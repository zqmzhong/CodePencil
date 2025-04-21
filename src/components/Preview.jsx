import { useState, useEffect, useRef } from 'react';

export function Preview({ code, renderPreview }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState('light');
  const previewRef = useRef(null);

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

  // 打印当前主题，测试是否正确检测到并更新
  useEffect(() => {
    console.log('Current theme:', theme);
  }, [theme]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 创建预览内容元素
  const previewElement = (
    <div
      ref={previewRef}
      className={`card transition-all duration-500 ease-in-out h-full flex flex-col ${isCollapsed ? 'h-10' : ''} ${isFullscreen ? 'fixed inset-0 z-50' : ''} flex-1 bg-base-100 preview-container shadow-md themed-element ${isAnimating ? 'pointer-events-none' : ''} rounded-xl overflow-hidden`}
    >
      {/* 添加一个额外的背景层，确保圆角正确显示 */}
      {!isCollapsed && <div className="absolute inset-0 bg-base-200 -z-10 themed-element" />}
      <div className="px-2 py-1 flex items-center justify-between border-b-0 bg-base-200">
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>预览图标</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="text-lg font-bold">实时预览</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1 rounded-md text-base-content focus:outline-none focus:ring-0 transition-colors hover:bg-base-300 active:bg-base-400"
          >
            <span className="text-lg">⛶</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setIsCollapsed(!isCollapsed);
                setTimeout(() => setIsAnimating(false), 500);
              }, 50);
            }}
            className="p-1 rounded-md text-base-content focus:outline-none focus:ring-0 transition-colors hover:bg-base-300 active:bg-base-400"
          >
            <span className="text-lg">{isCollapsed ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>
      <div className={`card-body p-0 overflow-auto flex-1 ${isCollapsed ? 'hidden' : 'block'} bg-base-100 themed-element`}>
        <div className="h-full relative">
          {/* 深色模式下添加一个覆盖层 */}
          {theme === 'dark' && (
            <div
              className="absolute inset-0 bg-base-300 z-0 themed-element"
              style={{ pointerEvents: 'none' }}
            />
          )}

          <iframe
            className="w-full h-full border-none relative z-10"
            srcDoc={code}
            sandbox="allow-scripts allow-same-origin"
            title="实时预览"
          />
        </div>
      </div>
    </div>
  );

  // 如果提供了renderPreview渲染函数，使用它来自定义渲染内容
  if (renderPreview) {
    return renderPreview({
      isCollapsed,
      isFullscreen,
      theme,
      toggleFullscreen,
      setIsCollapsed,
      children: previewElement
    });
  }

  // 否则直接返回预览元素
  return previewElement;
}
