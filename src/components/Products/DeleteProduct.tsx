import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface DeleteProductProps {
  productTitle: string;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteProductModal = ({ productTitle, onConfirm, onClose }: DeleteProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Match transition duration
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 300); // Trigger confirm after animation
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full mx-4 relative shadow-modern border border-dark-300 dark:border-gray-600 transform transition-all duration-300 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete <strong>{productTitle}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            No
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm text-white bg-error-500 rounded-lg hover:bg-error-600 transition-colors duration-200"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;