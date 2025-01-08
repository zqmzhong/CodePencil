function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          CodePen Clone
        </h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {/* 代码编辑器区域 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">代码编辑器</h2>
          <textarea
            className="w-full h-96 p-2 border rounded font-mono"
            placeholder="输入HTML代码..."
          />
        </div>

        {/* 预览区域 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">实时预览</h2>
          <div className="h-96 border rounded p-2">
            {/* 预览内容将显示在这里 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
