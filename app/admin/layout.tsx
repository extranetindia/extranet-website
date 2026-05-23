import type { Metadata } from "next";
import { AdminProvider } from "@/lib/admin/context/admin-provider";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminTopBar } from "@/components/admin/layout/AdminTopBar";

export const metadata: Metadata = {
  title: "Operations Console | Extranet Admin",
  description: "Extranet ISP operations, plan catalog, and content management.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#eef1f5] admin-console">
        <AdminSidebar />
        <div className="lg:pl-56">
          <AdminTopBar />
          <main className="px-4 py-4 sm:px-5 sm:py-5">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
