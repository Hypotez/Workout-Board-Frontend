import { useLocation } from 'react-router-dom';
import { getRouteByPath } from '@/config/routes';

export function usePageTitle(): string {
  const { pathname } = useLocation();
  const route = getRouteByPath(pathname);
  return route?.title || 'Dashboard';
}
