import type { TimeRangeKey, DateRange } from '@/types/dateRanges';

function format(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function computeRange(key: TimeRangeKey): DateRange {
  const today = new Date();
  const d = (offsetDays: number): Date => {
    const copy = new Date(today);
    copy.setDate(copy.getDate() + offsetDays);
    return copy;
  };

  switch (key) {
    case 'TODAY':
      return { key, from: format(today), to: format(today) };
    case 'YESTERDAY':
      return { key, from: format(d(-1)), to: format(d(-1)) };
    case 'YESTERDAY_TODAY':
      return { key, from: format(d(-1)), to: format(today) };
    case 'LAST_7_DAYS':
      return { key, from: format(d(-7)), to: format(today) };
    case 'LAST_30_DAYS':
      return { key, from: format(d(-30)), to: format(today) };
    case 'LAST_WEEK': {
      // semana pasada completa (lun-dom)
      const day = today.getDay(); // 0 dom..6 sab
      const diffToLastMonday = -7 - ((day + 6) % 7);
      const start = d(diffToLastMonday);
      const end = d(diffToLastMonday + 6);
      return { key, from: format(start), to: format(end) };
    }
    case 'LAST_MONTH': {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      return { key, from: format(start), to: format(end) };
    }
    case 'LIFETIME':
      return { key, from: null, to: null };
    case 'CUSTOM':
    default:
      return { key: 'CUSTOM', from: null, to: null };
  }
}
