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
}

export interface Adset {
  adset_id: string | null;
  adset_name: string | null;
  ad_account_id: string | null;
  ads: Ad[];
}

export interface Campaign {
  campaign_id: string | null;
  campaign_name: string | null;
  adsets: Adset[];
}
