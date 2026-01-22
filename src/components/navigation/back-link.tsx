import { createContext, useContext, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BackLinkContextValue {
  fallbackPath: string;
  label: string;
}

const BackLinkContext = createContext<BackLinkContextValue | null>(null);

interface BackLinkProviderProps {
  fallbackPath: string;
  label?: string;
  children: ReactNode;
}

interface BackLinkState {
  from?: string;
}

export function BackLinkProvider({ fallbackPath, label = 'Back', children }: BackLinkProviderProps) {
  return (
    <BackLinkContext.Provider value={{ fallbackPath, label }}>
      {children}
    </BackLinkContext.Provider>
  );
}

interface BackButtonProps {
  fallbackPath?: string;
  label?: string;
}

export function BackButton({ fallbackPath, label }: BackButtonProps) {
  const location = useLocation();
  const context = useContext(BackLinkContext);
  const state = location.state as BackLinkState | null;

  const target = state?.from ?? fallbackPath ?? context?.fallbackPath ?? '/';
  const buttonLabel = label ?? context?.label ?? 'Back';

  return (
    <Button asChild variant="outline">
      <Link to={target}>{buttonLabel}</Link>
    </Button>
  );
}
