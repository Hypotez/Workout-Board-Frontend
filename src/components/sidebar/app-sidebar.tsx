import * as React from "react"
import { useLocation } from "react-router-dom"
import { Dumbbell } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Nav } from "./nav-sidebar"
import { getMainRoutes, getFooterRoutes } from "@/config/routes"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Dumbbell className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Workout Board</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Nav items={getMainRoutes()} currentPath={pathname} />
        <Nav items={getFooterRoutes()} currentPath={pathname} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
