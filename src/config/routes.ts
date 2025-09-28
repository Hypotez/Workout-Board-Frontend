import { type ComponentType } from 'react';
import { Zap, List, Bot, LayoutDashboard, Settings } from 'lucide-react';

import dashboard from '@/pages/dashboard';
import ai from '@/pages/ai';
import workouts from '@/pages/workouts';
import routines from '@/pages/routines';
import settings from '@/pages/settings';
import login from '@/pages/login';
import register from '@/pages/register';

interface RoutesInformation {
  path: string;
  title: string;
  component: ComponentType;
}

interface RoutesWithIconInformation extends RoutesInformation {
  icon: ComponentType<{ className: string }>;
}

export interface Routes {
  [key: string]: RoutesInformation;
}

export interface RoutesWithIcon {
  [key: string]: RoutesWithIconInformation;
}

export const ROUTES: Routes = {
  dashboard: {
    path: '/dashboard',
    title: 'Dashboard',
    component: dashboard,
  },
  workouts: {
    path: '/workouts',
    title: 'Workouts',
    component: workouts,
  },
  routines: {
    path: '/routines',
    title: 'Routines',
    component: routines,
  },
  ai: {
    path: '/ai',
    title: 'Ask AI',
    component: ai,
  },
  settings: {
    path: '/settings',
    title: 'Settings',
    component: settings,
  },
  login: {
    path: '/login',
    title: 'Login',
    component: login,
  },
  register: {
    path: '/register',
    title: 'Register',
    component: register,
  },
};

export const ROUTES_WITH_ICONS: RoutesWithIcon = {
  dashboard: {
    ...ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  workouts: {
    ...ROUTES.workouts,
    icon: Zap,
  },
  routines: {
    ...ROUTES.routines,
    icon: List,
  },
  ai: {
    ...ROUTES.ai,
    icon: Bot,
  },
  settings: {
    ...ROUTES.settings,
    icon: Settings,
  },
};

export const getRouteByPath = (path: string) => {
  for (const key in ROUTES) {
    if (ROUTES[key].path === path) {
      return ROUTES[key];
    }
  }
  return undefined;
};
