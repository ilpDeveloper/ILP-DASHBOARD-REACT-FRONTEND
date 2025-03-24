import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

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

interface ViewProductProps {
  product: Product;
  onClose: () => void;
}

const ViewProduct = ({ product, onClose }: ViewProductProps) => {
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
        <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-4">Product Details</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-md font-semibold text-dark-900 dark:text-white">{product.productName}</h3>
              <p className="text-xs text-dark-700 dark:text-gray-300">Code: {product.productCode}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-dark-700 dark:text-gray-300">
              <span className="font-medium">Barcode:</span> {product.barcode}
            </p>
            <p className="text-dark-700 dark:text-gray-300">
              <span className="font-medium">Quantity:</span> {product.quantity}
            </p>
            <p className="text-dark-700 dark:text-gray-300">
              <span className="font-medium">Price/Unit:</span> ${product.pricePerUnit.toFixed(2)}
            </p>
            <p className="text-dark-700 dark:text-gray-300">
              <span className="font-medium">Total Amount:</span> ${product.totalAmount.toFixed(2)}
            </p>
            <p className="text-dark-700 dark:text-gray-300">
              <span className="font-medium">Sales Rate:</span> {product.salesRate} units/month
            </p>
            <p className="text-dark-700 dark:text-gray-300">
              <span className="font-medium">Rack No:</span> {product.rackNo}
            </p>
            <p className="text-dark-700 dark:text-gray-300">
              <span className="font-medium">Mfg Date:</span> {product.manufacturingDate}
            </p>
            <p className="text-dark-700 dark:text-gray-300">
              <span className="font-medium">Exp Date:</span> {product.expiryDate}
            </p>
          </div>
          <div className="border-t border-dark-300 dark:border-gray-600 pt-2">
            <p className="text-sm font-medium text-dark-900 dark:text-white">Supplier Info</p>
            <p className="text-xs text-dark-700 dark:text-gray-300">
              <span className="font-medium">Name:</span> {product.supplier.name}
            </p>
            <p className="text-xs text-dark-700 dark:text-gray-300">
              <span className="font-medium">Address:</span> {product.supplier.address}
            </p>
            <p className="text-xs text-dark-700 dark:text-gray-300">
              <span className="font-medium">Contact:</span> {product.supplier.contactNo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;