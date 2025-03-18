import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for the table rows
interface Product {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  status: "Delivered" | "Pending" | "Canceled";
  image: string;
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    name: "MacBook Pro 13”",
    variants: "2 Variants",
    category: "Laptop",
    price: "$2399.00",
    status: "Delivered",
    image: "/images/product/product-01.jpg",
  },
  {
    id: 2,
    name: "Apple Watch Ultra",
    variants: "1 Variant",
    category: "Watch",
    price: "$879.00",
    status: "Pending",
    image: "/images/product/product-02.jpg",
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    variants: "2 Variants",
    category: "SmartPhone",
    price: "$1869.00",
    status: "Delivered",
    image: "/images/product/product-03.jpg",
  },
  {
    id: 4,
    name: "iPad Pro 3rd Gen",
    variants: "2 Variants",
    category: "Electronics",
    price: "$1699.00",
    status: "Canceled",
    image: "/images/product/product-04.jpg",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    variants: "1 Variant",
    category: "Accessories",
    price: "$240.00",
    status: "Delivered",
    image: "/images/product/product-05.jpg",
  },
];

export default function RecentOrders() {
  // State to manage filters for category, price, and status
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    status: "",
  });

  // Function to update a specific filter key
  const updateFilter = (key: "category" | "price" | "status", value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filtering logic based on current filter values
  const filteredData = tableData.filter((product) => {
    const matchesCategory = filters.category
      ? product.category.toLowerCase().includes(filters.category.toLowerCase())
      : true;
    const matchesStatus = filters.status
      ? product.status === filters.status
      : true;
    const matchesPrice = filters.price
      ? product.price.toLowerCase().includes(filters.price.toLowerCase())
      : true;

    return matchesCategory && matchesStatus && matchesPrice;
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Orders
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter input for Category */}
          <input
            type="text"
            placeholder="Category"
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-brand-600"
          />
          {/* Filter input for Price */}
          <input
            type="text"
            placeholder="Price"
            value={filters.price}
            onChange={(e) => updateFilter("price", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-brand-600"
          />
          {/* Dropdown filter for Status */}
          <select
            value={filters.status}
            onChange={(e) => updateFilter("status", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-brand-600"
          >
            <option value="">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
          {/* Reset all filters */}
          <button
            onClick={() => setFilters({ category: "", price: "", status: "" })}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-200"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Products
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm dark:text-white">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-xs dark:text-gray-400">
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-sm dark:text-gray-400">
                  {product.category}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-sm dark:text-gray-400">
                  {product.price}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Delivered"
                        ? "success"
                        : product.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    <span
                      className={
                        product.status === "Delivered"
                          ? "bg-success-50 text-success-700 border-success-200 dark:bg-success-900 dark:text-success-300 dark:border-success-800"
                          : product.status === "Pending"
                          ? "bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-900 dark:text-warning-300 dark:border-warning-800"
                          : "bg-error-50 text-error-700 border-error-200 dark:bg-error-900 dark:text-error-300 dark:border-error-800"
                      }
                    >
                      {product.status}
                    </span>
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
