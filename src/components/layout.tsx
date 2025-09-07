import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

import { useIsMobile } from "@/hooks/use-mobile"
import { usePageTitle } from "@/hooks/use-page-title"

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const pageTitle = usePageTitle()

  return (
    <SidebarProvider defaultOpen={!isMobile}>
        <AppSidebar />
          <main className="flex flex-1 flex-col">
          <header className="flex items-center border-b">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage> {pageTitle} </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {children}
        </main>
    </SidebarProvider>
  )
}