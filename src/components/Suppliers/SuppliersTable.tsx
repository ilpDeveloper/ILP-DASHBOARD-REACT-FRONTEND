import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table"; // Adjust path if needed
import { FaFilter, FaEye, FaTruck, FaEllipsisV, FaPlus } from "react-icons/fa";
import AddSupplierModal from "./AddSupplierModal";
import DeleteSupplierModal from "./DeleteSupplierModal";
import ViewSupplier from "./ViewSupplier";
import { mockSuppliers } from "../../data/mockSuppliers";

interface Supplier {
  id: number;
  name: string;
  address: string;
  contactNo: string;
}

interface FilterState {
  search: string;
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filter, setFilter] = useState<FilterState>({ search: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteSupplier, setDeleteSupplier] = useState<Supplier | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    setTimeout(() => {
      setSuppliers(mockSuppliers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (showDeleteSuccess) {
      const timer = setTimeout(() => setShowDeleteSuccess(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showDeleteSuccess]);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(filter.search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSuppliers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === currentItems.length
        ? []
        : currentItems.map((s) => s.id)
    );
  };

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
  };

  const toggleMenu = (id: number) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleAddOpen = () => setIsAddOpen(true);
  const handleAddClose = () => setIsAddOpen(false);

  const handleAddSupplier = (newSupplier: Supplier) => {
    setSuppliers((prev) => [...prev, newSupplier]);
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    setDeleteSupplier(supplier);
    setMenuOpenId(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteSupplier) return;
    setSuppliers((prev) => prev.filter((s) => s.id !== deleteSupplier.id));
    setShowDeleteSuccess(true);
    setDeleteSupplier(null);
  };

  const handleDeleteClose = () => {
    setDeleteSupplier(null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] relative">
      {/* Success Notification */}
      {showDeleteSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out opacity-100">
          <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-modern border border-dark-300 dark:border-gray-600 text-gray-900 dark:text-white">
            <svg
              className="w-5 h-5 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-sm font-medium">Supplier Deleted! (Demo)</p>
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200">
          <FaTruck className="text-blue-500 text-2xl" />
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Suppliers
            </h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {suppliers.length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-gray-500 hover:text-gray-700"
              title="Filter"
            >
              <FaFilter size={16} />
            </button>
            <span className="text-sm text-gray-500">
              Selected: {selectedRows.length}
            </span>
          </div>
          <button
            onClick={handleAddOpen}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200 text-gray-900 dark:text-white"
          >
            <FaPlus className="text-primary-500 text-xm" />
            <span className="text-sm font-medium">Add Supplier</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            name="search"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            placeholder="Search by name..."
            className="px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 w-48"
          />
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <Table className="w-full table-auto">
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-900 dark:text-white text-left min-w-[50px]"
              >
                <input
                  type="checkbox"
                  checked={selectedRows.length === currentItems.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-900 dark:text-white text-left min-w-[80px]"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-900 dark:text-white text-left min-w-[150px]"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-900 dark:text-white text-left min-w-[200px]"
              >
                Address
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-900 dark:text-white text-left min-w-[120px]"
              >
                Contact No
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 font-medium text-gray-900 dark:text-white text-left min-w-[100px]"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {isLoading ? (
              <TableRow>
                <td colSpan={6} className="py-10 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="ml-4 text-gray-600 dark:text-gray-400">
                      Loading suppliers...
                    </span>
                  </div>
                </td>
              </TableRow>
            ) : (
              currentItems.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400 text-left min-w-[50px]">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(supplier.id)}
                      onChange={() => handleRowSelect(supplier.id)}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400 text-left min-w-[80px]">
                    {supplier.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400 text-left min-w-[150px]">
                    {supplier.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400 text-left min-w-[200px]">
                    {supplier.address}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400 text-left min-w-[120px]">
                    {supplier.contactNo}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-900 dark:text-gray-400 text-left min-w-[100px]">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleViewSupplier(supplier)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => toggleMenu(supplier.id)}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          title="More Options"
                        >
                          <FaEllipsisV size={16} />
                        </button>
                        {menuOpenId === supplier.id && (
                          <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-20">
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSupplier(supplier)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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

      {/* Pagination */}
      {!isLoading && (
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
          <div className="text-sm text-gray-900 dark:text-gray-400">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredSuppliers.length)} of{" "}
            {filteredSuppliers.length} entries
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
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

      {/* Modals */}
      {selectedSupplier && (
        <ViewSupplier supplier={selectedSupplier} onClose={handleCloseModal} />
      )}
      {isAddOpen && (
        <AddSupplierModal onClose={handleAddClose} onSave={handleAddSupplier} />
      )}
      {deleteSupplier && (
        <DeleteSupplierModal
          supplierName={deleteSupplier.name}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteClose}
        />
      )}
    </div>
  );
}
