import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Product from "../../components/Products/Products";
import PageMeta from "../../components/common/PageMeta";

export default function Products() {
  return (
    <div>
      <PageMeta
        title="Products | TailAdmin - React.js Admin Dashboard Template"
        description="This is the Products page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Products" />
      <div className="space-y-6">
        <ComponentCard title="Product List">
          <Product />
        </ComponentCard>
      </div>
    </div>
  );
}