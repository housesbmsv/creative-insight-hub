import type { FBCreativeRow, Campaign, Adset, Ad } from '@/types/creatives';

export function groupCreatives(rows: FBCreativeRow[]): Campaign[] {
  const campaignMap = new Map<string, Campaign>();

  for (const row of rows) {
    const campaignKey = row.campaign_id ?? '__no_campaign__';
    
    if (!campaignMap.has(campaignKey)) {
      campaignMap.set(campaignKey, {
        campaign_id: row.campaign_id,
        campaign_name: row.campaign_name,
        adsets: [],
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
      };
      campaign.adsets.push(adset);
    }

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
    };

    adset.ads.push(ad);
  }

  return Array.from(campaignMap.values());
}
