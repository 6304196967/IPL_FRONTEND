import { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
};

// Toast component to render (add this to your root component)
export const Toast = ({ toast }) => {
  if (!toast) return null;

  const bgColor = toast.type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg`}>
      {toast.message}
    </div>
  );
};
export default useToast;
