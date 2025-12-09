import { Button } from '@/components/ui/button';
import { useDateRange } from '@/hooks/useDateRange';
import type { TimeRangeKey } from '@/types/dateRanges';
import { Send } from 'lucide-react';

const PRESETS: { key: TimeRangeKey; label: string }[] = [
  { key: 'TODAY', label: 'Hoy' },
  { key: 'YESTERDAY', label: 'Ayer' },
  { key: 'YESTERDAY_TODAY', label: 'Ayer y Hoy' },
  { key: 'LAST_7_DAYS', label: 'Últimos 7 días' },
  { key: 'LAST_30_DAYS', label: 'Últimos 30 días' },
  { key: 'LAST_WEEK', label: 'Última semana' },
  { key: 'LAST_MONTH', label: 'Último mes' },
  { key: 'LIFETIME', label: 'Lifetime' },
];

interface DateRangeBarProps {
  onSend?: () => void;
  loading?: boolean;
}

export function DateRangeBar({ onSend, loading }: DateRangeBarProps) {
  const { range, setPreset } = useDateRange();

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <Button
              key={preset.key}
              variant={range.key === preset.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreset(preset.key)}
              className="text-xs"
            >
              {preset.label}
            </Button>
          ))}
        </div>
        {onSend && (
          <Button 
            onClick={onSend} 
            size="sm" 
            disabled={loading}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            ENVIAR
          </Button>
        )}
      </div>
      {range.from && range.to && (
        <p className="text-xs text-muted-foreground mt-3">
          Rango: {range.from} → {range.to}
        </p>
      )}
    </div>
  );
}
