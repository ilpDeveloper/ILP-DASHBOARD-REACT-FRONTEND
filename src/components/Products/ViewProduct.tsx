import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

const ViewProduct = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 1000); // Delay to let animation finish
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity duration-1000 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4 relative shadow-lg transform transition-all duration-1000 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{product.title}</h2>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
        />
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Category:</strong> {product.category.name}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Price:</strong> ${product.price}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Description:</strong> {product.description}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Slug:</strong> {product.slug}
        </p>
      </div>
    </div>
  );
};

export default ViewProduct;