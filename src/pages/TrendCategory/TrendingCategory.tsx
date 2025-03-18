import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TrendingCategory from "../../components/TrendingCategory/TrendingCategory";

export default function TrendingCategoryPage() {
  return (
    <div>
      <PageMeta
        title="Trending Category | TailAdmin - React.js Admin Dashboard Template"
        description="This is the Trending Category page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Trending Category" />
      <div className="space-y-6">
        <ComponentCard title="Trending Category List">
          <TrendingCategory />
        </ComponentCard>
      </div>
    </div>
  );
}