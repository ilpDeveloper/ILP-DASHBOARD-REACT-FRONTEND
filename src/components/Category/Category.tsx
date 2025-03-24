import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table";
import { FaEye, FaPlus, FaTags, FaEdit, FaTrash } from "react-icons/fa";
import AddCategory from "./AddCategory";
import ViewCategory from "./ViewCategory";
import DeleteCategory from "./DeleteCategory";
import type { Category } from "../../api/CategoryApi";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory as deleteCategoryApi,
} from "../../api/CategoryApi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface DisplayCategory extends Category {
  ebtActive: boolean;
}

const Category = () => {
  const [categories, setCategories] = useState<DisplayCategory[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [viewCategory, setViewCategory] = useState<DisplayCategory | null>(null);
  const [editCategory, setEditCategory] = useState<DisplayCategory | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<DisplayCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getCategories();
        if (response.success) {
          const cleanedCategories = response.data.map((cat) => ({
            ...cat,
            showPOS: cat.showPOS.trim(),
            catStatus: cat.catStatus || "N/A",
            ebtActive: cat.catStatus?.toLowerCase().includes("ebt") || false,
          }));
          setCategories(cleanedCategories.sort((a, b) => a.position - b.position));
        } else {
          toast.error("Failed to fetch categories", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch categories", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map((cat) => cat.categoryName));
    }
  };

  const handleRowSelect = (categoryName: string) => {
    setSelectedRows((prev) =>
      prev.includes(categoryName)
        ? prev.filter((rowId) => rowId !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleAddCategoryOpen = () => setIsAddOpen(true);
  const handleAddCategoryClose = () => setIsAddOpen(false);

  const handleEditOpen = (category: DisplayCategory) => {
    setEditCategory(category);
    setIsEditOpen(true);
  };

  const handleEditClose = () => setIsEditOpen(false);

  const handleViewCategory = (category: DisplayCategory) => {
    setViewCategory(category);
  };

  const handleDeleteCategory = (category: DisplayCategory) => {
    setDeleteCategory(category);
  };

  const handleAddConfirm = async (newCategory: Category) => {
    try {
      const response = await createCategory(newCategory);
      if (response.success) {
        const displayCategory: DisplayCategory = {
          ...newCategory,
          ebtActive: newCategory.catStatus?.toLowerCase().includes("ebt") || false,
        };
        setCategories((prev) =>
          [...prev, displayCategory].sort((a, b) => a.position - b.position)
        );
        handleAddCategoryClose();
        toast.success("Category added successfully! 🎉", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(response.message || "Failed to create category", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Failed to create category", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleEditConfirm = async (updatedCategory: Category) => {
    try {
      const response = await updateCategory(
        updatedCategory.categoryName,
        updatedCategory
      );
      if (response.success) {
        const displayCategory: DisplayCategory = {
          ...updatedCategory,
          ebtActive: updatedCategory.catStatus?.toLowerCase().includes("ebt") || false,
        };
        setCategories((prev) =>
          prev
            .map((cat) =>
              cat.categoryName === updatedCategory.categoryName
                ? displayCategory
                : cat
            )
            .sort((a, b) => a.position - b.position)
        );
        setIsEditOpen(false);
        toast.success("Category updated successfully! ✨", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(response.message || "Failed to update category", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Failed to update category", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteCategory) {
      try {
        const response = await deleteCategoryApi(deleteCategory.categoryName);
        if (response.success) {
          setCategories((prev) =>
            prev.filter((cat) => cat.categoryName !== deleteCategory.categoryName)
          );
          toast.success("Category deleted successfully! 🗑️", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            style: {
              background: '#ef4444',
              color: 'white',
            },
          });
        } else {
          toast.error(response.message || "Failed to delete category", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (error) {
        toast.error("Failed to delete category", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
    setDeleteCategory(null);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {/* Pop-up Messages */}
      {/* Summary Section */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200">
          <FaTags className="text-blue-500 text-2xl" />
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Categories
            </h3>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {categories.length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
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
            onClick={handleAddCategoryOpen}
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
                    checked={selectedRows.length === currentItems.length}
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
                  EBT Active
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
                  <td colSpan={8} className="py-10 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                      <span className="ml-4 text-gray-600 dark:text-gray-400">
                        Loading categories...
                      </span>
                    </div>
                  </td>
                </TableRow>
              ) : filteredCategories.length === 0 ? (
                <TableRow>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-gray-600 dark:text-gray-400"
                  >
                    No categories found
                  </td>
                </TableRow>
              ) : (
                currentItems.map((category) => (
                  <TableRow
                    key={category.categoryName}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <TableCell className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(category.categoryName)}
                        onChange={() => handleRowSelect(category.categoryName)}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-left text-gray-900 dark:text-gray-400">
                      {category.categoryName}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-left text-gray-900 dark:text-gray-400">
                      {category.catStatus}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      {category.ebtActive ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      {category.ageVerification ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      {category.ageVerification2 ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      {category.showPOS ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center text-gray-900 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => handleViewCategory(category)}
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditOpen(category)}
                          className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                          title="Edit Category"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Category"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination - Hidden if there's an error */}
      {!isLoading && filteredCategories.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
          <div className="text-sm text-gray-900 dark:text-gray-400">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredCategories.length)} of{" "}
            {filteredCategories.length} entries
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
      {isAddOpen && (
        <AddCategory
          onClose={handleAddCategoryClose}
          onSave={handleAddConfirm}
        />
      )}
      {isEditOpen && editCategory && (
        <AddCategory
          onClose={handleEditClose}
          onSave={handleEditConfirm}
          initialData={editCategory}
        />
      )}
      {viewCategory && (
        <ViewCategory
          category={viewCategory}
          onClose={() => setViewCategory(null)}
        />
      )}
      {deleteCategory && (
        <DeleteCategory
          categoryName={deleteCategory.categoryName}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteCategory(null)}
        />
      )}
    </div>
  );
};

export default Category;
