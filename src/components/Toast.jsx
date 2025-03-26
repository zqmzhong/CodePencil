import { useEffect } from 'react';

export function Toast({ message, type = 'info', visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 1000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`flex items-center px-4 py-2 rounded shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
      }`}>
        <span>{message}</span>
      </div>
    </div>
  );
}
