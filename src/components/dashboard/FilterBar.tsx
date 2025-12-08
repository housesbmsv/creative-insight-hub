import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedAccount: string;
  onAccountChange: (value: string) => void;
  accountIds: string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedAccount,
  onAccountChange,
  accountIds,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por campaña, adset, anuncio, headline o texto..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border/50 focus:border-primary/50"
        />
      </div>
      <Select value={selectedAccount} onValueChange={onAccountChange}>
        <SelectTrigger className="w-full sm:w-[220px] bg-card border-border/50">
          <SelectValue placeholder="Todas las cuentas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las cuentas</SelectItem>
          {accountIds.map((id) => (
            <SelectItem key={id} value={id}>
              {id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
