import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { type RouteConfig } from "@/config/routes"

interface NavProps {
  items: RouteConfig[]
  currentPath: string
  className?: string
}

export function Nav({ items, currentPath, className }: NavProps) {
  return (
    <SidebarMenu className={className}>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            asChild 
            isActive={currentPath === item.path}
          >
            <a href={item.path}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}