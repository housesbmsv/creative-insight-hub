import { useState } from 'react';
import type { Campaign } from '@/types/creatives';
import { AdsetCard } from './AdsetCard';
import { MetricsGrid } from './MetricsGrid';
import { ChevronDown, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const totalAds = campaign.adsets.reduce((sum, adset) => sum + adset.ads.length, 0);

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 hover:bg-muted/20 transition-colors text-left"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {campaign.campaign_name ?? 'Campaña sin nombre'}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
              {campaign.bm_name && (
                <>
                  <span className="text-xs">{campaign.bm_name}</span>
                  <span>•</span>
                </>
              )}
              {campaign.ad_account_name && (
                <>
                  <span className="text-xs">{campaign.ad_account_name}</span>
                  <span>•</span>
                </>
              )}
              <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                {campaign.campaign_id ?? 'N/A'}
              </span>
              <span>•</span>
              <span>{campaign.adsets.length} adset{campaign.adsets.length !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>{totalAds} anuncio{totalAds !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'w-6 h-6 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Metrics Grid */}
      {campaign.metrics && (
        <div className="px-5 pb-4 border-b border-border/30">
          <MetricsGrid metrics={campaign.metrics} />
        </div>
      )}

      {isOpen && (
        <div className="px-5 pb-5 pt-4 space-y-4">
          {campaign.adsets.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No hay adsets en esta campaña
            </p>
          ) : (
            campaign.adsets.map((adset, index) => (
              <AdsetCard key={adset.adset_id ?? index} adset={adset} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
