import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';

interface AddProductModalProps {
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  });

  React.useEffect(() => {
    setIsOpen(true); // Open modal on mount
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Match transition duration
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Product:', formData); // Replace with API call or Redux dispatch later
    handleClose(); // Close modal on submit
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 relative shadow-modern border border-dark-300 dark:border-gray-600 transform transition-all duration-300 ease-out overflow-visible ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <IoClose size={20} />
        </button>
        <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product title"
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              required
            >
              <option value="">Select category</option>
              <option value="Clothes">Clothes</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Shoes">Shoes</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description"
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              rows={2}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
              required
            />
          </div>

          {/* Styled Submit Button */}
          <button
            type="submit"
            className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex items-center justify-center gap-3 hover:shadow-lg transition-shadow duration-200 text-gray-900 dark:text-white border border-dark-300 dark:border-gray-600"
          >
            <FaPlus className="text-primary-500 text-xl" />
            <span className="text-sm font-medium">Add Product</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;