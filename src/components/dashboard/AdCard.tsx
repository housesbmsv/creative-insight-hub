import type { Ad } from '@/types/creatives';
import { MetricsGrid } from './MetricsGrid';
import { ExternalLink, Image as ImageIcon, Video, FileText } from 'lucide-react';

interface AdCardProps {
  ad: Ad;
}

function getStatusClass(status: string | null): string {
  if (!status) return 'status-inactive';
  const s = status.toLowerCase();
  if (s === 'active') return 'status-active';
  if (s === 'paused') return 'status-paused';
  return 'status-inactive';
}

function getObjectTypeIcon(type: string | null) {
  if (!type) return <FileText className="w-4 h-4" />;
  const t = type.toLowerCase();
  if (t.includes('video')) return <Video className="w-4 h-4" />;
  if (t.includes('image') || t.includes('photo')) return <ImageIcon className="w-4 h-4" />;
  return <FileText className="w-4 h-4" />;
}

export function AdCard({ ad }: AdCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-muted/30 rounded-lg border border-border/30 hover:border-border/60 transition-colors animate-fade-in">
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          {ad.thumbnail_url ? (
            <img
              src={ad.thumbnail_url}
              alt={ad.ad_name ?? 'Ad thumbnail'}
              className="w-16 h-16 rounded-lg object-cover bg-muted"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
              {getObjectTypeIcon(ad.object_type)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-foreground truncate">
              {ad.ad_name ?? 'Sin nombre'}
            </span>
            <span className={`text-xs font-medium ${getStatusClass(ad.ad_status)}`}>
              {ad.ad_status ?? 'Desconocido'}
            </span>
          </div>

          {ad.headline && (
            <p className="text-sm text-foreground/90 line-clamp-1">{ad.headline}</p>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {ad.creative_name && (
              <span className="flex items-center gap-1">
                {getObjectTypeIcon(ad.object_type)}
                <span className="truncate max-w-[150px]">{ad.creative_name}</span>
              </span>
            )}
            {ad.object_type && (
              <span className="px-2 py-0.5 bg-secondary rounded text-secondary-foreground">
                {ad.object_type}
              </span>
            )}
          </div>

          {ad.primary_text && (
            <p className="text-xs text-muted-foreground line-clamp-2">{ad.primary_text}</p>
          )}
        </div>

        {/* CTA Link */}
        {ad.cta_link && (
          <a
            href={ad.cta_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Ver destino
          </a>
        )}
      </div>

      {/* Ad Metrics */}
      {ad.metrics && (
        <div className="pt-2 border-t border-border/20">
          <MetricsGrid metrics={ad.metrics} compact />
        </div>
      )}
    </div>
  );
}
