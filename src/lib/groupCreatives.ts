import type { FBCreativeRow, Campaign, Adset, Ad, MetricsSummary } from '@/types/creatives';

function createEmptyMetrics(): MetricsSummary {
  return {
    spend: 0,
    impressions: 0,
    clicks: 0,
    purchases: 0,
    revenue: 0,
    ctr: 0,
    cpc: 0,
    cpm: 0,
    cpa: 0,
    roas: 0,
  };
}

function addRowMetrics(metrics: MetricsSummary, row: FBCreativeRow): void {
  metrics.spend += row.spend ?? 0;
  metrics.impressions += row.impressions ?? 0;
  metrics.clicks += row.clicks ?? 0;
  metrics.purchases += row.compras ?? 0;
  metrics.revenue += row.valor_conversion_compras ?? 0;
}

function calculateDerivedMetrics(metrics: MetricsSummary): void {
  if (metrics.impressions > 0) {
    metrics.ctr = (metrics.clicks / metrics.impressions) * 100;
    metrics.cpm = (metrics.spend / metrics.impressions) * 1000;
  }
  if (metrics.clicks > 0) {
    metrics.cpc = metrics.spend / metrics.clicks;
  }
  if (metrics.purchases > 0) {
    metrics.cpa = metrics.spend / metrics.purchases;
  }
  if (metrics.spend > 0) {
    metrics.roas = metrics.revenue / metrics.spend;
  }
}

export function groupCreatives(rows: FBCreativeRow[]): Campaign[] {
  const campaignMap = new Map<string, Campaign>();
  const adMetricsMap = new Map<string, MetricsSummary>();

  // First pass: collect all metrics per ad (since multiple rows can exist per ad due to daily data)
  for (const row of rows) {
    const adKey = row.ad_id ?? '__no_ad__';
    
    if (!adMetricsMap.has(adKey)) {
      adMetricsMap.set(adKey, createEmptyMetrics());
    }
    addRowMetrics(adMetricsMap.get(adKey)!, row);
  }

  // Calculate derived metrics for each ad
  adMetricsMap.forEach((metrics) => calculateDerivedMetrics(metrics));

  // Track which ads we've already added (to avoid duplicates from multiple daily rows)
  const addedAds = new Set<string>();

  for (const row of rows) {
    const campaignKey = row.campaign_id ?? '__no_campaign__';
    const adKey = row.ad_id ?? '__no_ad__';
    
    // Skip if we've already added this ad
    if (addedAds.has(adKey)) continue;
    addedAds.add(adKey);

    if (!campaignMap.has(campaignKey)) {
      campaignMap.set(campaignKey, {
        campaign_id: row.campaign_id,
        campaign_name: row.campaign_name,
        adsets: [],
        bm_name: row.bm_name,
        ad_account_name: row.ad_account_name,
        ad_account_id: row.ad_account_id,
        metrics: createEmptyMetrics(),
      });
    }

    const campaign = campaignMap.get(campaignKey)!;
    const adsetKey = row.adset_id ?? '__no_adset__';
    
    let adset = campaign.adsets.find((a) => (a.adset_id ?? '__no_adset__') === adsetKey);
    
    if (!adset) {
      adset = {
        adset_id: row.adset_id,
        adset_name: row.adset_name,
        ad_account_id: row.ad_account_id,
        ads: [],
        metrics: createEmptyMetrics(),
      };
      campaign.adsets.push(adset);
    }

    const adMetrics = adMetricsMap.get(adKey) ?? createEmptyMetrics();

    const ad: Ad = {
      ad_id: row.ad_id,
      ad_name: row.ad_name,
      ad_status: row.ad_status,
      updated_time: row.updated_time,
      creative_id: row.creative_id,
      creative_name: row.creative_name,
      creative_status: row.creative_status,
      object_type: row.object_type,
      primary_text: row.primary_text,
      headline: row.headline,
      thumbnail_url: row.thumbnail_url,
      cta_link: row.cta_link,
      page_id: row.page_id,
      video_id: row.video_id,
      metrics: adMetrics,
    };

    adset.ads.push(ad);
  }

  // Aggregate metrics up the hierarchy
  campaignMap.forEach((campaign) => {
    campaign.adsets.forEach((adset) => {
      // Sum ad metrics into adset
      adset.ads.forEach((ad) => {
        if (ad.metrics) {
          adset.metrics!.spend += ad.metrics.spend;
          adset.metrics!.impressions += ad.metrics.impressions;
          adset.metrics!.clicks += ad.metrics.clicks;
          adset.metrics!.purchases += ad.metrics.purchases;
          adset.metrics!.revenue += ad.metrics.revenue;
        }
      });
      calculateDerivedMetrics(adset.metrics!);

      // Sum adset metrics into campaign
      campaign.metrics!.spend += adset.metrics!.spend;
      campaign.metrics!.impressions += adset.metrics!.impressions;
      campaign.metrics!.clicks += adset.metrics!.clicks;
      campaign.metrics!.purchases += adset.metrics!.purchases;
      campaign.metrics!.revenue += adset.metrics!.revenue;
    });
    calculateDerivedMetrics(campaign.metrics!);
  });

  return Array.from(campaignMap.values());
}
