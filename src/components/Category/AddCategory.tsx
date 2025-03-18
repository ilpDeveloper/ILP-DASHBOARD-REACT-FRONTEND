import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

interface AddCategoryProps {
  onClose: () => void;
  onSave?: (category: Category) => void;
  initialData?: Category;
}

interface Category {
  id: number;
  name: string;
  status: string;
  ebtActive: boolean;
  ageVerification1: boolean;
  ageVerification2: boolean;
  showOnPos: boolean;
}

const AddCategory = ({ onClose, onSave, initialData }: AddCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Category>(
    initialData || {
      id: Date.now(),
      name: "",
      status: "Active",
      ebtActive: false,
      ageVerification1: false,
      ageVerification2: false,
      showOnPos: false,
    }
  );

  useEffect(() => {
    setIsOpen(true); // Open modal on mount
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Match transition duration
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
    else console.log("Saving category:", formData);
    handleClose();
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
          {initialData ? "Edit Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="EBT Active">EBT Active</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs text-dark-700 dark:text-gray-300">
              <input
                type="checkbox"
                name="ebtActive"
                checked={formData.ebtActive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              EBT Active
            </label>
            <label className="flex items-center gap-2 text-xs text-dark-700 dark:text-gray-300">
              <input
                type="checkbox"
                name="ageVerification1"
                checked={formData.ageVerification1}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              Age Verification 1
            </label>
            <label className="flex items-center gap-2 text-xs text-dark-700 dark:text-gray-300">
              <input
                type="checkbox"
                name="ageVerification2"
                checked={formData.ageVerification2}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              Age Verification 2
            </label>
            <label className="flex items-center gap-2 text-xs text-dark-700 dark:text-gray-300">
              <input
                type="checkbox"
                name="showOnPos"
                checked={formData.showOnPos}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              Show on POS Screen
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex items-center justify-center gap-3 hover:shadow-lg transition-shadow duration-200 text-gray-900 dark:text-white border border-dark-300 dark:border-gray-600"
          >
            <FaPlus className="text-primary-500 text-xl" />
            <span className="text-sm font-medium">{initialData ? "Update Category" : "Add Category"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;