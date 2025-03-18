import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ViewCategoryProps {
  category: {
    id: number;
    name: string;
    status: string;
    ebtActive: boolean;
    ageVerification1: boolean;
    ageVerification2: boolean;
    showOnPos: boolean;
  };
  onClose: () => void;
}

const ViewCategory = ({ category, onClose }: ViewCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Open modal on mount
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Match transition duration
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
        <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
          Category Details
        </h2>
        <div className="space-y-3">
          <div>
            <span className="block text-xs font-medium text-dark-700 dark:text-gray-300">
              Category Name
            </span>
            <p className="mt-1 text-dark-900 dark:text-white text-sm">{category.name}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-dark-700 dark:text-gray-300">
              Status
            </span>
            <p className="mt-1 text-dark-900 dark:text-white text-sm">{category.status}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-dark-700 dark:text-gray-300">
              EBT Active
            </span>
            <p className="mt-1 text-dark-900 dark:text-white text-sm">{category.ebtActive ? "Yes" : "No"}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-dark-700 dark:text-gray-300">
              Age Verification 1
            </span>
            <p className="mt-1 text-dark-900 dark:text-white text-sm">{category.ageVerification1 ? "Yes" : "No"}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-dark-700 dark:text-gray-300">
              Age Verification 2
            </span>
            <p className="mt-1 text-dark-900 dark:text-white text-sm">{category.ageVerification2 ? "Yes" : "No"}</p>
          </div>
          <div>
            <span className="block text-xs font-medium text-dark-700 dark:text-gray-300">
              Show on POS Screen
            </span>
            <p className="mt-1 text-dark-900 dark:text-white text-sm">{category.showOnPos ? "Yes" : "No"}</p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="w-full mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex items-center justify-center hover:shadow-lg transition-shadow duration-200 text-gray-900 dark:text-white border border-dark-300 dark:border-gray-600"
        >
          <span className="text-sm font-medium">Close</span>
        </button>
      </div>
    </div>
  );
};

export default ViewCategory;