"use client";

import { useMemo, useState } from "react";
import { useAdmin } from "@/lib/admin/context/admin-provider";
import type { AdminCustomerAccount } from "@/lib/domain/admin-customer";
import type { AdminCustomerFormInput } from "@/lib/domain/admin-customer";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminStat } from "@/components/admin/ui/AdminStat";
import { CustomersTable } from "@/components/admin/customers/CustomersTable";
import { CustomerFormDrawer } from "@/components/admin/customers/CustomerFormDrawer";

export function CustomerManagement() {
  const {
    activeCustomers,
    createCustomer,
    updateCustomer,
    suspendCustomer,
    reactivateCustomer,
    deleteCustomer,
  } = useAdmin();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCustomerAccount | undefined>();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activeCustomers;
    return activeCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.accountId.toLowerCase().includes(q) ||
        c.phoneRaw.includes(q) ||
        c.planName.toLowerCase().includes(q)
    );
  }, [activeCustomers, search]);

  const stats = useMemo(() => {
    const active = activeCustomers.filter((c) => c.status === "active").length;
    const negotiated = activeCustomers.filter((c) => c.overrideAmount != null).length;
    return { total: activeCustomers.length, active, negotiated };
  }, [activeCustomers]);

  const openCreate = () => {
    setEditing(undefined);
    setDrawerOpen(true);
  };

  const openEdit = (customer: AdminCustomerAccount) => {
    setEditing(customer);
    setDrawerOpen(true);
  };

  const handleSave = (input: AdminCustomerFormInput) => {
    if (editing) {
      updateCustomer(editing.customerId, input);
    } else {
      createCustomer(input);
    }
    setDrawerOpen(false);
  };

  const handleDelete = (customer: AdminCustomerAccount) => {
    if (
      window.confirm(
        `Soft-delete ${customer.name} (${customer.accountId})? They will be hidden from active lists.`
      )
    ) {
      deleteCustomer(customer.customerId);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Customer management"
        description="Onboard subscribers, assign plans, and set standard or negotiated billing. Portal renewals always use assigned billingAmount."
        actions={
          <AdminButton variant="primary" onClick={openCreate}>
            + Add customer
          </AdminButton>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <AdminStat label="Total customers" value={stats.total} />
        <AdminStat label="Active" value={stats.active} />
        <AdminStat
          label="Negotiated rates"
          value={stats.negotiated}
          hint="Override vs catalog"
        />
      </div>

      <AdminCard className="mb-4 border-telecom/20 bg-telecom-light/30">
        <p className="text-[12px] leading-relaxed text-foreground">
          <strong>Pricing rule:</strong> If override is empty → billing = public catalog price.
          If override is set → billing = negotiated amount. Catalog list prices are never modified.
        </p>
      </AdminCard>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, account, mobile, plan…"
          className="w-full max-w-sm rounded border border-border px-3 py-2 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom"
        />
        <p className="text-[11px] text-muted">{filtered.length} customer(s)</p>
      </div>

      <CustomersTable
        customers={filtered}
        onEdit={openEdit}
        onSuspend={(c) => suspendCustomer(c.customerId)}
        onReactivate={(c) => reactivateCustomer(c.customerId)}
        onDelete={handleDelete}
      />

      <CustomerFormDrawer
        open={drawerOpen}
        mode={editing ? "edit" : "create"}
        customer={editing}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
