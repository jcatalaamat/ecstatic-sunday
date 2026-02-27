import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="font-heading text-2xl font-semibold text-[var(--foreground)] mb-4">
          Lost on the Dance Floor
        </h2>
        <p className="text-[var(--foreground-muted)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Maybe it moved to a different rhythm.
        </p>
        <Button href="/" variant="gradient">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
