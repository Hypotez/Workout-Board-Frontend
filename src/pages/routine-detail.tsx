import { useParams } from 'react-router-dom';
import { BackButton } from '@/components/navigation/back-link';

export default function RoutineDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-4">
      <div className="absolute left-6 top-4">
        <BackButton />
      </div>
      <h1 className="text-2xl font-semibold">Routine</h1>
      <p className="text-muted-foreground">ID: {id}</p>
    </div>
  );
}
