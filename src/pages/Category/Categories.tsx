import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Category from "../../components/Category/Category";

export default function Categories() { 
  return (
    <div>
      <PageMeta
        title="Categories | TailAdmin - React.js Admin Dashboard Template"
        description="This is the Categories page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Categories" />
      <div className="space-y-6">
        <ComponentCard title="Category List">
          <Category />
        </ComponentCard>
      </div>
    </div>
  );
}