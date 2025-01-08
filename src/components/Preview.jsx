export function Preview({ code }) {
  return (
    <div className="mt-4 bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">实时预览</h2>
      <iframe
        className="w-full h-96 border rounded"
        srcDoc={code}
        sandbox="allow-scripts allow-same-origin"
        title="实时预览"
      />
    </div>
  );
}
