import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { DisplayCategory } from "./Category";

interface ViewCategoryProps {
  category: DisplayCategory;
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

  // Convert bColor to a hex color if possible, otherwise use a fallback
  const bColorValue = category.bColor.toString(16); // Convert to hex (e.g., -32768 -> "ffff8000")
  const colorHex = `#${bColorValue.startsWith("ff") ? bColorValue.slice(2) : bColorValue}`; // Remove "ff" prefix if present
  const isValidColor = /^#[0-9A-Fa-f]{6}$/.test(colorHex); // Check if it's a valid hex color
  const displayColor = isValidColor ? colorHex : "#808080"; // Fallback to gray if invalid

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg p-4 max-w-md w-full mx-4 relative shadow-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <IoClose size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <svg
              className="w-5 h-5 text-blue-500 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Category Details
          </h2>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Category Name
              </span>
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-md text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                {category.categoryName}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Status
              </span>
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-md text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                {category.catStatus || "N/A"}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                EBT Active
              </span>
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-md text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                {category.ebtActive ? "Yes" : "No"}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Age Verification 1
              </span>
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-md text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                {category.ageVerification ? "Yes" : "No"}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Age Verification 2
              </span>
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-md text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                {category.ageVerification2 ? "Yes" : "No"}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Show on POS Screen
              </span>
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-md text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                {category.showPOS.trim() === "Yes" ? "Yes" : "No"}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Is Synced
              </span>
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-md text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                {category.isSync ? "Yes" : "No"}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Background Color
              </span>
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-md flex items-center border border-gray-200 dark:border-gray-700">
                <div
                  className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
                  style={{ backgroundColor: displayColor }}
                  title={`Background Color: ${displayColor}`}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewCategory;