import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface Supplier {
  id: number;
  name: string;
  address: string;
  contactNo: string;
}

interface ViewSupplierProps {
  supplier: Supplier;
  onClose: () => void;
}

const ViewSupplier = ({ supplier, onClose }: ViewSupplierProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4 relative shadow-modern border border-dark-300 dark:border-gray-600 transform transition-all duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <IoClose size={20} />
        </button>
        <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-4">Supplier Details</h2>
        <div className="space-y-3 text-sm">
          <p className="text-dark-700 dark:text-gray-300">
            <span className="font-medium">ID:</span> {supplier.id}
          </p>
          <p className="text-dark-700 dark:text-gray-300">
            <span className="font-medium">Name:</span> {supplier.name}
          </p>
          <p className="text-dark-700 dark:text-gray-300">
            <span className="font-medium">Address:</span> {supplier.address}
          </p>
          <p className="text-dark-700 dark:text-gray-300">
            <span className="font-medium">Contact No:</span> {supplier.contactNo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewSupplier;