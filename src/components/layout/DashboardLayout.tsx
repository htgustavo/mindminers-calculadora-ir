import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="container mx-auto w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
