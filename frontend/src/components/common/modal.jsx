// components/common/Modal.jsx

import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
        {title && (
          <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
        )}

        {children}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
