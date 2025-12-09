import { useState } from 'react';
import type { Adset } from '@/types/creatives';
import { AdCard } from './AdCard';
import { MetricsGrid } from './MetricsGrid';
import { ChevronDown, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdsetCardProps {
  adset: Adset;
}

export function AdsetCard({ adset }: AdsetCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-border/40 rounded-lg bg-card/50 overflow-hidden animate-fade-in">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="p-2 bg-secondary rounded-md">
            <Layers className="w-4 h-4 text-secondary-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-foreground truncate">
              {adset.adset_name ?? 'Adset sin nombre'}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>ID: {adset.adset_id ?? 'N/A'}</span>
              <span>•</span>
              <span>{adset.ads.length} anuncio{adset.ads.length !== 1 ? 's' : ''}</span>
            </div>
            {adset.metrics && (
              <div className="mt-2">
                <MetricsGrid metrics={adset.metrics} compact />
              </div>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="p-4 pt-0 space-y-3">
          {adset.ads.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay anuncios en este adset
            </p>
          ) : (
            adset.ads.map((ad, index) => (
              <AdCard key={ad.ad_id ?? index} ad={ad} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
