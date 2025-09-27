import { AppSidebar } from "@/components/sidebar/app-sidebar"

import { Button } from "@/components/ui/button"

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
import { ModeToggle } from "./darkmode/mode-toggle"

export function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const pageTitle = usePageTitle()

  return (
    <SidebarProvider defaultOpen={!isMobile}>
        <AppSidebar />
          <main className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="cursor-pointer hover:cursor-pointer" asChild>
                <SidebarTrigger/>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      <h1 className="font-semibold tracking-tight">
                        {pageTitle}
                      </h1>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Add the dark mode toggle to the right side */}
            <div className="flex items-center gap-4">
              <ModeToggle />
            </div>
            
          </header>
          {children}
        </main>
    </SidebarProvider>
  )
}