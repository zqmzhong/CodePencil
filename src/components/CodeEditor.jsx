export function CodeEditor({ title, value, onChange, placeholder }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <textarea
        className="w-full h-80 p-2 border rounded font-mono"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
