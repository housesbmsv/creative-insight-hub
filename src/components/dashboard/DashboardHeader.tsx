import { LayoutDashboard } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="mb-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl animate-pulse-glow">
          <LayoutDashboard className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            FB Creatives Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Campañas → Adsets → Anuncios/Creativos (Supabase)
          </p>
        </div>
      </div>
    </header>
  );
}
