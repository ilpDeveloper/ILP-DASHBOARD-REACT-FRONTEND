import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Suppliers from "../../components/Suppliers/SuppliersTable";

export default function SuppliersPage() {
  return (
    <div>
      <PageMeta
        title="Suppliers | TailAdmin - React.js Admin Dashboard Template"
        description="This is the Suppliers page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Suppliers" />
      <div className="space-y-6">
        <ComponentCard title="Supplier List">
          <Suppliers />
        </ComponentCard>
      </div>
    </div>
  );
}