'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { groupCreatives } from '@/lib/groupCreatives';
import type { FBCreativeRow, Campaign } from '@/types/creatives';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { DateRangeBar } from '@/components/dashboard/DateRangeBar';
import { CampaignCard } from '@/components/dashboard/CampaignCard';
import { useDateRange } from '@/hooks/useDateRange';
import { Loader2, AlertCircle, FolderOpen } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<FBCreativeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');
  
  const { range } = useDateRange();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // For now, fetch from fb_creatives_dashboard
        // Later this can be replaced with a view that joins insights_daily_ad
        const { data: rows, error: fetchError } = await supabase
          .from('fb_creatives_dashboard')
          .select('*');

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setData(rows ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [range]); // Refetch when range changes

  // Extract unique account IDs
  const accountIds = useMemo(() => {
    const ids = new Set<string>();
    data.forEach((row) => {
      if (row.ad_account_id) ids.add(row.ad_account_id);
    });
    return Array.from(ids).sort();
  }, [data]);

  // Filter data
  const filteredData = useMemo(() => {
    let result = data;

    // Filter by account
    if (selectedAccount !== 'all') {
      result = result.filter((row) => row.ad_account_id === selectedAccount);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((row) => {
        return (
          row.campaign_name?.toLowerCase().includes(query) ||
          row.adset_name?.toLowerCase().includes(query) ||
          row.ad_name?.toLowerCase().includes(query) ||
          row.headline?.toLowerCase().includes(query) ||
          row.primary_text?.toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [data, selectedAccount, searchQuery]);

  // Group filtered data into campaigns
  const campaigns: Campaign[] = useMemo(() => {
    return groupCreatives(filteredData);
  }, [filteredData]);

  const handleSendWebhook = async () => {
    // Placeholder for future webhook functionality
    console.log('Sending webhook with range:', range);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground text-lg">Cargando creatives…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="glass-card p-8 max-w-md w-full text-center animate-fade-in">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Error al cargar datos</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <DashboardHeader />
        
        <DateRangeBar onSend={handleSendWebhook} loading={loading} />
        
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          accountIds={accountIds}
        />

        {campaigns.length === 0 ? (
          <div className="glass-card p-12 text-center animate-fade-in">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedAccount !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'No hay datos disponibles en la tabla'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {campaigns.map((campaign, index) => (
              <CampaignCard key={campaign.campaign_id ?? index} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
