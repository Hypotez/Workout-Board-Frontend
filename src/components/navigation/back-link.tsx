import { createContext, useContext, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackLinkContextValue {
  fallbackPath: string;
}

const BackLinkContext = createContext<BackLinkContextValue | null>(null);

interface BackLinkProviderProps {
  fallbackPath: string;
  children: ReactNode;
}

export function BackLinkProvider({ fallbackPath, children }: BackLinkProviderProps) {
  return (
    <BackLinkContext.Provider value={{ fallbackPath }}>
      {children}
    </BackLinkContext.Provider>
  );
}

export function BackButton() {
  const context = useContext(BackLinkContext);
  const target = context?.fallbackPath ?? '/';

  return (
    <Button asChild variant="outline" size="icon" aria-label="Back">
      <Link to={target}>
        <ArrowLeft className="size-4" />
      </Link>
    </Button>
  );
}
