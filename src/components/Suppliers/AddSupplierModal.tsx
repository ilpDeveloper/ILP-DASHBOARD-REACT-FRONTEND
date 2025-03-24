import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

interface Supplier {
  id: number;
  name: string;
  address: string;
  contactNo: string;
}

interface AddSupplierModalProps {
  onClose: () => void;
  onSave?: (supplier: Supplier) => void;
  initialData?: Supplier;
}

const AddSupplierModal = ({ onClose, onSave, initialData }: AddSupplierModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Supplier>(
    initialData || {
      id: Date.now(),
      name: "",
      address: "",
      contactNo: "",
    }
  );

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
    handleClose();
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
        <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-4">
          {initialData ? "Edit Supplier" : "Add New Supplier"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., TechCorp"
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Tech St"
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Contact No
            </label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="e.g., 555-1234"
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex items-center justify-center gap-3 hover:shadow-lg transition-shadow duration-200 text-gray-900 dark:text-white border border-dark-300 dark:border-gray-600"
          >
            <FaPlus className="text-primary-500 text-xl" />
            <span className="text-sm font-medium">{initialData ? "Update Supplier" : "Add Supplier"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;