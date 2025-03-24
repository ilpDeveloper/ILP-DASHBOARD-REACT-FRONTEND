import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

interface DeleteSupplierModalProps {
  supplierName: string;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteSupplierModal = ({ supplierName, onConfirm, onClose }: DeleteSupplierModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 relative shadow-modern border border-dark-300 dark:border-gray-600 transform transition-all duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <IoClose size={20} />
        </button>
        <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-4">Delete Supplier</h2>
        <p className="text-sm text-dark-700 dark:text-gray-300 mb-4">
          Are you sure you want to delete <span className="font-medium">{supplierName}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-3 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSupplierModal;