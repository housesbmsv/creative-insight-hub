export type TimeRangeKey =
  | 'TODAY'
  | 'YESTERDAY'
  | 'YESTERDAY_TODAY'
  | 'LAST_7_DAYS'
  | 'LAST_30_DAYS'
  | 'LAST_WEEK'
  | 'LAST_MONTH'
  | 'LIFETIME'
  | 'CUSTOM';

export interface DateRange {
  key: TimeRangeKey;
  from: string | null; // 'YYYY-MM-DD'
  to: string | null;
}
