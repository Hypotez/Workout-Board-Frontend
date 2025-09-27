import { type ComponentType } from "react"
import { Zap, List, Bot, LayoutDashboard, Settings } from "lucide-react"

import dashboard from "@/pages/dashboard"
import ai from "@/pages/ai"
import workouts from "@/pages/workouts"
import routines from "@/pages/routines"
import settings from "@/pages/settings"

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
    component: dashboard,
    category: categoryMain
  },
  {
    path: "/workouts",
    title: "Workouts",
    icon: Zap, 
    component: workouts,
    category: categoryMain
  },
  {
    path: "/routines",
    title: "Routines",
    icon: List, 
    component: routines,
    category: categoryMain
  },
  {
    path: "/ai",
    title: "Ask AI",
    icon: Bot, 
    component: ai,
    category: categoryMain
  },
  {
    path: "/settings",
    title: "Settings",
    icon: Settings, 
    component: settings,
    category: categoryFooter
  },
]

export const getMainRoutes = () => ROUTES.filter(route => route.category === categoryMain)
export const getFooterRoutes = () => ROUTES.filter(route => route.category === categoryFooter)
export const getRouteByPath = (path: string) => ROUTES.find(route => route.path === path)