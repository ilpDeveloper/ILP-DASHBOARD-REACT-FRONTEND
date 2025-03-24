import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Category } from "../../api/CategoryApi";

interface AddCategoryProps {
  onClose: () => void;
  onSave: (category: Category) => Promise<void>;
  initialData?: Category;
}

const AddCategory = ({ onClose, onSave, initialData }: AddCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Category>(
    initialData || {
      categoryName: "",
      bColor: -32768,
      catStatus: "Active",
      ageVerification: false,
      position: 0,
      showPOS: "No",
      ageVerification2: false,
      isSync: false,
    }
  );

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
      handleClose();
    }
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
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
          disabled={isSaving}
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {initialData ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Show Category Name field only when adding (not editing) */}
          {!initialData && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm transition-colors duration-200"
                required
                disabled={isSaving}
                placeholder="Enter category name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="catStatus"
              value={formData.catStatus || "Active"}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm transition-colors duration-200"
              disabled={isSaving}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="ageVerification"
                checked={formData.ageVerification}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200"
                disabled={isSaving}
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Age Verification 1
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="ageVerification2"
                checked={formData.ageVerification2}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200"
                disabled={isSaving}
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Age Verification 2
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="ebtActive"
                checked={formData.catStatus?.toLowerCase().includes("ebt") || false}
                onChange={(e) => {
                  const isEbtActive = e.target.checked;
                  setFormData((prev) => ({
                    ...prev,
                    catStatus: isEbtActive ? "Active EBT" : "Active",
                  }));
                }}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200"
                disabled={isSaving}
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                EBT Active
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isSync"
                checked={formData.isSync}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200"
                disabled={isSaving}
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Is Synced
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Show on POS Screen
            </label>
            <select
              name="showPOS"
              value={formData.showPOS}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm transition-colors duration-200"
              disabled={isSaving}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 text-sm font-medium transition-colors duration-200"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-sm font-medium flex items-center gap-2 transition-colors duration-200"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;