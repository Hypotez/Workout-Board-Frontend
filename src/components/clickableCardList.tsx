import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export type ClickableCardItem = {
  id: string;
  title: string;
  description?: string;
};

export function ClickableCardList({
  items,
  header,
  description,
  onItemClick,
}: {
  items: ClickableCardItem[];
  header?: string;
  description?: string;
  onItemClick?: (item: ClickableCardItem) => void;
}) {
  return (
    <Card className="w-full max-w-md">
      {(header || description) && (
        <CardHeader className="space-y-1">
          {header && <CardTitle className="text-2xl text-center">{header}</CardTitle>}
          {description && <CardDescription className="text-center">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {items.map((item) => (
          <button
            key={item.id}
            className="w-full text-left p-4 rounded-lg border hover:bg-primary/10 transition-colors cursor-pointer"
            onClick={() => onItemClick?.(item)}
          >
            <div className="font-semibold">{item.title}</div>
            {item.description && (
              <div className="text-sm text-muted-foreground">{item.description}</div>
            )}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
