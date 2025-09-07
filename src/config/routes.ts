import { type ComponentType } from "react"
import { Bot, LayoutDashboard } from "lucide-react"

import Dashboard from "@/pages/dashboard"
import Ai from "@/pages/ai"

type RouteCategory = 'main' | 'footer'

const categoryMain: RouteCategory = 'main'
const categoryFooter: RouteCategory = 'footer'

export interface RouteConfig {
  path: string
  title: string
  icon: ComponentType<{ className?: string }>
  component: ComponentType
  category: RouteCategory
}

export const ROUTES: RouteConfig[] = [
  {
    path: "/dashboard",
    title: "Dashboard", 
    icon: LayoutDashboard,
    component: Dashboard,
    category: categoryMain
  },
  {
    path: "/ai",
    title: "Ask AI",
    icon: Bot, 
    component: Ai,
    category: categoryMain
  }
]

export const getMainRoutes = () => ROUTES.filter(route => route.category === categoryMain)
export const getFooterRoutes = () => ROUTES.filter(route => route.category === categoryFooter)
export const getRouteByPath = (path: string) => ROUTES.find(route => route.path === path)