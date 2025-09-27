import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Dumbbell, LogOut, User } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { Nav } from './nav-sidebar';
import { getMainRoutes, getFooterRoutes } from '@/config/routes';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();

  const [userName] = React.useState('John Doe');
  const [userEmail] = React.useState('john.doe@email.com');

  const handleLogout = () => {
    console.log('Logging out...');
  };

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
      <SidebarFooter>
        <Separator className="mb-3" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Avatar className="h-8 w-8 shrink-0 bg-muted border">
              <AvatarFallback className="bg-muted-foreground/20 text-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userName}</p>
              <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
