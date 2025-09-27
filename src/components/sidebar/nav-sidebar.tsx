import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { type RouteConfig } from "@/config/routes"

interface NavProps {
  items: RouteConfig[]
  currentPath: string
  className?: string
}

export function Nav({ items, currentPath, className }: NavProps) {
  return (
    <SidebarMenu className={cn("group-data-[collapsible=icon]:items-center", className)}>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            asChild 
            isActive={currentPath === item.path}
            className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
          >
            <NavLink to={item.path}>
              <item.icon className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}