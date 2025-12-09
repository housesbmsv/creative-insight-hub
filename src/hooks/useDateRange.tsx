import { createContext, useContext, useState, ReactNode } from 'react';
import type { DateRange, TimeRangeKey } from '@/types/dateRanges';
import { computeRange } from '@/lib/dateRanges';

interface DateRangeContextValue {
  range: DateRange;
  setPreset: (key: TimeRangeKey) => void;
  setCustom: (from: string, to: string) => void;
}

const DateRangeContext = createContext<DateRangeContextValue | undefined>(undefined);

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [range, setRange] = useState<DateRange>(() => computeRange('LAST_7_DAYS'));

  const setPreset = (key: TimeRangeKey) => setRange(computeRange(key));
  const setCustom = (from: string, to: string) =>
    setRange({ key: 'CUSTOM', from, to });

  return (
    <DateRangeContext.Provider value={{ range, setPreset, setCustom }}>
      {children}
    </DateRangeContext.Provider>
  );
};

export function useDateRange() {
  const ctx = useContext(DateRangeContext);
  if (!ctx) throw new Error('useDateRange debe usarse dentro de DateRangeProvider');
  return ctx;
}
