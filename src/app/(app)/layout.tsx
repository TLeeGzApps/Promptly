import { Sidebar, SidebarProvider, SidebarInset, SidebarRail } from "@/components/ui/sidebar";
import { SidebarHeader } from "@/components/layout/sidebar-header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MainHeader } from "@/components/layout/main-header";
import { Footer } from "@/components/layout/footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader />
        <SidebarNav />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <MainHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
