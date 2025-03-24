import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface Supplier {
  id: number;
  name: string;
  address: string;
  contactNo: string;
}

interface Product {
  id: number;
  productCode: string;
  productName: string;
  barcode: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  salesRate: number;
  rackNo: string;
  manufacturingDate: string;
  expiryDate: string;
  supplier: Supplier;
  imageUrl: string;
}

interface ProductFormProps {
  onSave?: (product: Product) => void;
  onClose: () => void;
  initialData?: Product;
}

const ProductForm = ({ onSave, onClose, initialData }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>(
    initialData || {
      id: Date.now(),
      productCode: "",
      productName: "",
      barcode: "",
      quantity: 0,
      pricePerUnit: 0,
      totalAmount: 0,
      salesRate: 0,
      rackNo: "",
      manufacturingDate: "",
      expiryDate: "",
      supplier: { id: 1, name: "TechCorp", address: "", contactNo: "" },
      imageUrl: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "quantity" || name === "pricePerUnit") {
        updated.totalAmount = Number(updated.quantity) * Number(updated.pricePerUnit);
      }
      return updated;
    });
  };

  const handleSupplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      supplier: { ...prev.supplier, name: e.target.value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Product Code
        </label>
        <input
          type="text"
          name="productCode"
          value={formData.productCode}
          onChange={handleChange}
          placeholder="e.g., P001"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="e.g., Laptop Pro"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Barcode
        </label>
        <input
          type="text"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          placeholder="e.g., 123456789012"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Price Per Unit ($)
        </label>
        <input
          type="number"
          name="pricePerUnit"
          value={formData.pricePerUnit}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Total Amount ($)
        </label>
        <input
          type="number"
          name="totalAmount"
          value={formData.totalAmount}
          disabled
          className="w-full p-2 border border-dark-300 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white dark:border-gray-600 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Sales Rate (units/month)
        </label>
        <input
          type="number"
          name="salesRate"
          value={formData.salesRate}
          onChange={handleChange}
          min="0"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Rack No
        </label>
        <input
          type="text"
          name="rackNo"
          value={formData.rackNo}
          onChange={handleChange}
          placeholder="e.g., A1"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Manufacturing Date
        </label>
        <input
          type="date"
          name="manufacturingDate"
          value={formData.manufacturingDate}
          onChange={handleChange}
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Expiry Date
        </label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Supplier
        </label>
        <input
          type="text"
          name="supplier"
          value={formData.supplier.name}
          onChange={handleSupplierChange}
          placeholder="e.g., TechCorp"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-dark-700 dark:text-gray-300 mb-1">
          Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="e.g., https://via.placeholder.com/150"
          className="w-full p-2 border border-dark-300 rounded-lg focus:ring focus:ring-primary-200 focus:border-primary-500 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm"
          required
        />
      </div>
      <div className="col-span-2">
        <button
          type="submit"
          className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 flex items-center justify-center gap-3 hover:shadow-lg transition-shadow duration-200 text-gray-900 dark:text-white border border-dark-300 dark:border-gray-600"
        >
          <FaPlus className="text-primary-500 text-xl" />
          <span className="text-sm font-medium">{initialData ? "Update Product" : "Add Product"}</span>
        </button>
      </div>
    </form>
  );
};

export default ProductForm;