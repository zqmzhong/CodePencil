import { createContext, useState, useContext } from 'react';
import { Toast } from '../components/Toast';

const GlobalUIContext = createContext();

export const GlobalUIProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info'
  });

  const showToast = (options) => {
    setToast({
      visible: true,
      message: options.message,
      type: options.type || 'info'
    });
    
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, options.duration || 3000);
  };

  return (
    <GlobalUIContext.Provider value={{ showToast }}>
      {children}
      <Toast {...toast} onClose={() => setToast(prev => ({ ...prev, visible: false }))} />
    </GlobalUIContext.Provider>
  );
};

export const useGlobalUI = () => useContext(GlobalUIContext);
