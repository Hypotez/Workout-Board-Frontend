import { ClickableCardList, type ClickableCardItem } from '@/components/clickableCardList';

const items: ClickableCardItem[] = [
  { index: 0, title: 'Push Day', description: 'Chest, shoulders' },
  { index: 1, title: 'Pull Day', description: 'Back, biceps' },
  { index: 2, title: 'Leg Day', description: 'Quads, hamstrings, calves' },
];

export default function Routines() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ClickableCardList
        items={items}
        header="Routines"
        description="Click any"
        onItemClick={(item) => alert(`Clicked: ${item.title}`)}
      />
    </div>
  );
}
