import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table";
import { FaEye, FaEllipsisV, FaPlus } from "react-icons/fa";
import AddCategory from "./AddCategory";
import ViewCategory from "./ViewCategory";
import DeleteCategory from "./DeleteCategory";

interface Category {
  id: number;
  name: string;
  status: string;
  ebtActive: boolean;
  ageVerification1: boolean;
  ageVerification2: boolean;
  showOnPos: boolean;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<Category | null>(null);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const mockCategories: Category[] = [
      {
        id: 1,
        name: "Electronics",
        status: "Active",
        ebtActive: false,
        ageVerification1: false,
        ageVerification2: false,
        showOnPos: true,
      },
      {
        id: 2,
        name: "Clothing",
        status: "EBT Active",
        ebtActive: true,
        ageVerification1: false,
        ageVerification2: false,
        showOnPos: true,
      },
      {
        id: 3,
        name: "Groceries",
        status: "Inactive",
        ebtActive: false,
        ageVerification1: true,
        ageVerification2: false,
        showOnPos: false,
      },
    ];
    setTimeout(() => {
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (showDeleteSuccess) {
      const timer = setTimeout(() => setShowDeleteSuccess(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showDeleteSuccess]);

  const handleSelectAll = () => {
    if (selectedRows.length === categories.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(categories.map((cat) => cat.id));
    }
  };

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleMenu = (id: number) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleAddProductOpen = () => setIsAddOpen(true);
  const handleAddProductClose = () => setIsAddOpen(false);

  const handleEditOpen = (category: Category) => {
    setEditCategory(category);
    setIsEditOpen(true);
    setMenuOpenId(null);
  };

  const handleEditClose = () => setIsEditOpen(false);

  const handleViewProduct = (category: Category) => {
    setViewProduct(category);
    setMenuOpenId(null);
  };

  const handleDeleteProduct = (category: Category) => {
    setDeleteCategory(category);
    setMenuOpenId(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteCategory) {
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== deleteCategory.id)
      );
      setShowDeleteSuccess(true);
    }
    setDeleteCategory(null);
  };

  const handleEditConfirm = (updatedCategory: Category) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
    setIsEditOpen(false);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] relative">
      {showDeleteSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-modern border border-dark-300 dark:border-gray-600 text-gray-900 dark:text-white opacity-100">
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
            <p className="text-sm font-medium">Category Deleted! (Demo)</p>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handleAddProductOpen}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-900 dark:text-white"
          >
            <FaPlus className="text-primary-500" />
            <span className="text-sm font-medium">Add Category</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-4 py-3 w-12 text-center font-medium text-gray-900 dark:text-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredCategories.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-left font-medium text-gray-900 dark:text-white"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white"
                >
                  Age Verif. 1
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white"
                >
                  Age Verif. 2
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white"
                >
                  Show on POS
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white w-24"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {isLoading ? (
                <TableRow>
                  <td colSpan={7} className="py-10 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                      <span className="ml-4 text-gray-600 dark:text-gray-400">
                        Loading categories...
                      </span>
                    </div>
                  </td>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow
                    key={category.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <TableCell className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(category.id)}
                        onChange={() => handleRowSelect(category.id)}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-left text-gray-900 dark:text-gray-400">
                      {category.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-left text-gray-900 dark:text-gray-400">
                      {category.status}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      {category.ageVerification1 ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      {category.ageVerification2 ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      {category.showOnPos ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => handleViewProduct(category)}
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => toggleMenu(category.id)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <FaEllipsisV size={16} />
                          </button>
                          {menuOpenId === category.id && (
                            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
                              <button
                                onClick={() => handleEditOpen(category)}
                                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(category)}
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
      </div>

      {isAddOpen && <AddCategory onClose={handleAddProductClose} />}
      {isEditOpen && editCategory && (
        <AddCategory
          onClose={handleEditClose}
          onSave={handleEditConfirm}
          initialData={editCategory}
        />
      )}
      {viewProduct && (
        <ViewCategory
          category={viewProduct}
          onClose={() => setViewProduct(null)}
        />
      )}
      {deleteCategory && (
        <DeleteCategory
          categoryName={deleteCategory.name}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteCategory(null)}
        />
      )}
    </div>
  );
};

export default Category;
