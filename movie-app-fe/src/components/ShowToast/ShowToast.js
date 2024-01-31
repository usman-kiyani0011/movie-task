import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShowToast = (message, type = 'success', options) => {
  const defaultOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const mergedOptions = options ? { ...defaultOptions, ...options } : defaultOptions;

  return toast[type](message, mergedOptions);
};
