import { Logo } from "@/components/Logo";

export function DashboardMobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-white px-4 lg:hidden">
      <Logo href="/" />
    </header>
  );
}
