import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TrendingProducts from "../../components/TrendingProducts/TrendingProduct";

export default function TrendingProductsPage() {
  return (
    <div>
      <PageMeta
        title="Trending Products | TailAdmin - React.js Admin Dashboard Template"
        description="This is the Trending Products page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Trending Products" />
      <div className="space-y-6">
        <ComponentCard title="Trending Products List">
          <TrendingProducts />
        </ComponentCard>
      </div>
    </div>
  );
}