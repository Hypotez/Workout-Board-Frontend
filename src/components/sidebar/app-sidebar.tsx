import { type ComponentProps, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, LogOut, User } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import httpClient from '@/service/httpClient';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import { NavSidebarIcon } from './nav-sidebar-icon';
import { ROUTES_WITH_ICONS } from '@/config/routes';
import { useUser } from '@/hooks/use-user';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUser();
  const userName = user?.username ?? 'John Doe';
  const userEmail = user?.email ?? 'john.doe@email.com';

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await httpClient('/v1/auth/logout', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
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
        <NavSidebarIcon
          items={{
            dashboard: ROUTES_WITH_ICONS.dashboard,
            workouts: ROUTES_WITH_ICONS.workouts,
            routines: ROUTES_WITH_ICONS.routines,
            ai: ROUTES_WITH_ICONS.ai,
          }}
          currentPath={pathname}
        />
        <NavSidebarIcon
          items={{
            settings: ROUTES_WITH_ICONS.settings,
          }}
          currentPath={pathname}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <Separator className="mb-3" />

        <div className="flex items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:space-y-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:space-x-0">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center space-x-3 flex-1 min-w-0 hover:bg-muted rounded-md p-2 transition-colors focus:outline-none cursor-pointer hover:cursor-pointer group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:space-x-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:items-center">
                <Avatar className="h-8 w-8 shrink-0 bg-muted border group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6">
                  <AvatarFallback className="bg-muted-foreground/20 text-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 text-left group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>User Menu</DialogTitle>
                <DialogDescription className="sr-only">
                  Access your profile and account options.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-sm text-muted-foreground">{userEmail}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer hover:cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 cursor-pointer hover:cursor-pointer ml-2 group-data-[collapsible=icon]:ml-0"
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
