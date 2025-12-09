export interface MetricsSummary {
  spend: number;
  impressions: number;
  clicks: number;
  purchases: number;
  revenue: number;
  ctr: number;
  cpc: number;
  cpm: number;
  cpa: number;
  roas: number;
}

export interface FBCreativeRow {
  ad_account_id: string | null;
  campaign_id: string | null;
  campaign_name: string | null;
  adset_id: string | null;
  adset_name: string | null;
  ad_id: string | null;
  ad_name: string | null;
  ad_status: string | null;
  updated_time: string | null;
  creative_id: string | null;
  creative_name: string | null;
  creative_status: string | null;
  object_type: string | null;
  effective_object_story_id: string | null;
  primary_text: string | null;
  headline: string | null;
  thumbnail_url: string | null;
  video_id: string | null;
  cta_link: string | null;
  page_id: string | null;
  // Metrics from insights_daily_ad (when joined)
  date_start?: string | null;
  date_stop?: string | null;
  impressions?: number | null;
  reach?: number | null;
  clicks?: number | null;
  spend?: number | null;
  ctr_todos?: number | null;
  tasa_conversion?: number | null;
  compras?: number | null;
  valor_conversion_compras?: number | null;
  // Additional fields from joins
  bm_name?: string | null;
  ad_account_name?: string | null;
  fanpage_name?: string | null;
}

export interface Ad {
  ad_id: string | null;
  ad_name: string | null;
  ad_status: string | null;
  updated_time: string | null;
  creative_id: string | null;
  creative_name: string | null;
  creative_status: string | null;
  object_type: string | null;
  primary_text: string | null;
  headline: string | null;
  thumbnail_url: string | null;
  cta_link: string | null;
  page_id: string | null;
  video_id: string | null;
  metrics?: MetricsSummary;
}

export interface Adset {
  adset_id: string | null;
  adset_name: string | null;
  ad_account_id: string | null;
  ads: Ad[];
  metrics?: MetricsSummary;
}

export interface Campaign {
  campaign_id: string | null;
  campaign_name: string | null;
  adsets: Adset[];
  bm_name?: string | null;
  ad_account_name?: string | null;
  ad_account_id?: string | null;
  metrics?: MetricsSummary;
}
