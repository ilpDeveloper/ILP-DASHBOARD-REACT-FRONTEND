import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table";
import { FaFilter, FaEye, FaBox, FaTag, FaChartLine, FaEllipsisV, FaPlus } from "react-icons/fa";
import AddProductModal from "./AddProducts";
import DeleteProductModal from "./DeleteProduct";
import ViewProduct from './ViewProduct';
import { mockProducts } from "../../data/mockProdcuts";

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

interface FilterState {
  search: string;
  supplier: string;
  price: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filter, setFilter] = useState<FilterState>({ search: "", supplier: "", price: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000); // Simulate loading
  }, []);

  useEffect(() => {
    if (showDeleteSuccess) {
      const timer = setTimeout(() => setShowDeleteSuccess(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showDeleteSuccess]);

  const filteredBySearch = products.filter((product) => {
    const searchTerm = filter.search.toLowerCase();
    return (
      product.productCode.toLowerCase().includes(searchTerm) ||
      product.productName.toLowerCase().includes(searchTerm) ||
      product.barcode.toLowerCase().includes(searchTerm) ||
      product.supplier.name.toLowerCase().includes(searchTerm)
    );
  });

  const filteredBySupplier = filter.supplier
    ? filteredBySearch.filter((product) =>
        product.supplier.name.toLowerCase().includes(filter.supplier.toLowerCase())
      )
    : filteredBySearch;

  const filteredProducts = filter.price
    ? filteredBySupplier.filter((product) =>
        product.pricePerUnit.toString().includes(filter.price)
      )
    : filteredBySupplier;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const uniqueSuppliers = Array.from(new Set(products.map((p) => p.supplier.name)));

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === currentItems.length ? [] : currentItems.map((p) => p.id));
  };

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (supplier: string) => {
    setFilter({ ...filter, supplier });
    setIsSupplierOpen(false);
    setCurrentPage(1);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const toggleMenu = (id: number) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleAddOpen = () => setIsAddOpen(true);
  const handleAddClose = () => setIsAddOpen(false);

  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product);
    setMenuOpenId(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteProduct) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
    setShowDeleteSuccess(true);
    setDeleteProduct(null);
  };

  const handleDeleteClose = () => {
    setDeleteProduct(null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] relative">
      {showDeleteSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out opacity-100">
          <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-modern border border-dark-300 dark:border-gray-600 text-gray-900 dark:text-white">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm font-medium">Item Deleted! (Demo)</p>
          </div>
        </div>
      )}

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200">
          <FaBox className="text-blue-500 text-2xl" />
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Products</h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{products.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200">
          <FaTag className="text-green-500 text-2xl" />
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Suppliers</h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{uniqueSuppliers.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200">
          <FaChartLine className="text-purple-500 text-2xl" />
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Supplier</h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{uniqueSuppliers[0] || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700" title="Filter">
              <FaFilter size={16} />
            </button>
            <span className="text-sm text-gray-500">Selected: {selectedRows.length}</span>
          </div>
          <button
            onClick={handleAddOpen}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200 text-gray-900 dark:text-white"
          >
            <FaPlus className="text-primary-500 text-xm" />
            <span className="text-sm font-medium">Add Product</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="search"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            placeholder="Search by code, name, barcode..."
            className="px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 w-48"
          />
          <div className="relative">
            <button
              onClick={() => setIsSupplierOpen(!isSupplierOpen)}
              className="px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 w-48 text-left flex justify-between items-center"
            >
              <span>{filter.supplier || "All Suppliers"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isSupplierOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isSupplierOpen && (
              <div className="absolute mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleFilterChange("")}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  All Suppliers
                </button>
                {uniqueSuppliers.map((sup) => (
                  <button
                    key={sup}
                    onClick={() => handleFilterChange(sup)}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {sup}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            name="price"
            value={filter.price}
            onChange={(e) => setFilter({ ...filter, price: e.target.value })}
            placeholder="Filter by price"
            className="px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 w-48"
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                <input
                  type="checkbox"
                  checked={selectedRows.length === currentItems.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Code</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Name</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Barcode</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Qty</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Price/Unit</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Total</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Sales Rate</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Rack</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Mfg Date</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Exp Date</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Supplier</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Image</TableCell>
              <TableCell isHeader className="px-4 py-3 font-medium text-gray-900 dark:text-white">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {isLoading ? (
              <td colSpan={14} className="py-10 text-center">
                <div className="flex justify-center items-center w-full">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="ml-4 text-gray-600 dark:text-gray-400">Loading products...</span>
                  </div>
                </div>
              </td>
            ) : (
              currentItems.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(product.id)}
                      onChange={() => handleRowSelect(product.id)}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.productCode}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.productName}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.barcode}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.quantity}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">${product.pricePerUnit}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">${product.totalAmount}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.salesRate}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.rackNo}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.manufacturingDate}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.expiryDate}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">{product.supplier.name}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">
                    <img src={product.imageUrl} alt={product.productName} className="w-10 h-10 rounded-full" />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => toggleMenu(product.id)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          title="More Options"
                        >
                          <FaEllipsisV size={16} />
                        </button>
                        {menuOpenId === product.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
                            <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product)}
                              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && (
        <div className="flex justify-between items-center p-4">
          <div className="text-sm text-gray-900 dark:text-gray-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedProduct && <ViewProduct product={selectedProduct} onClose={handleCloseModal} />}
      {isAddOpen && <AddProductModal onClose={handleAddClose} />}
      {deleteProduct && (
        <DeleteProductModal
          productTitle={deleteProduct.productName}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
        />
      )}
    </div>
  );
}