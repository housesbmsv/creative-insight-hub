import type { MetricsSummary } from '@/types/creatives';
import { DollarSign, Eye, MousePointer, ShoppingCart, TrendingUp } from 'lucide-react';

interface MetricsGridProps {
  metrics: MetricsSummary;
  compact?: boolean;
}

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toFixed(0);
}

export function MetricsGrid({ metrics, compact = false }: MetricsGridProps) {
  const hasData = metrics.spend > 0 || metrics.impressions > 0;

  if (!hasData) {
    return (
      <div className="text-xs text-muted-foreground italic">
        Sin métricas disponibles
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1 text-muted-foreground">
          <DollarSign className="w-3 h-3" />
          {formatCurrency(metrics.spend)}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Eye className="w-3 h-3" />
          {formatNumber(metrics.impressions)}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <MousePointer className="w-3 h-3" />
          {formatNumber(metrics.clicks)}
        </span>
        {metrics.purchases > 0 && (
          <span className="flex items-center gap-1 text-success">
            <ShoppingCart className="w-3 h-3" />
            {metrics.purchases}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <DollarSign className="w-3 h-3" />
          Gasto
        </div>
        <div className="text-lg font-semibold text-foreground">
          {formatCurrency(metrics.spend)}
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <Eye className="w-3 h-3" />
          CPM
        </div>
        <div className="text-lg font-semibold text-foreground">
          {formatCurrency(metrics.cpm)}
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <MousePointer className="w-3 h-3" />
          CPC
        </div>
        <div className="text-lg font-semibold text-foreground">
          {formatCurrency(metrics.cpc)}
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <TrendingUp className="w-3 h-3" />
          ROAS
        </div>
        <div className="text-lg font-semibold text-foreground">
          {metrics.roas > 0 ? `${metrics.roas.toFixed(2)}x` : '-'}
        </div>
      </div>

      {metrics.purchases > 0 && (
        <>
          <div className="bg-success/10 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-success mb-1">
              <ShoppingCart className="w-3 h-3" />
              Compras
            </div>
            <div className="text-lg font-semibold text-success">
              {metrics.purchases}
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <DollarSign className="w-3 h-3" />
              CPA
            </div>
            <div className="text-lg font-semibold text-foreground">
              {formatCurrency(metrics.cpa)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
