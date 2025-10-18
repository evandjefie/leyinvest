import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; 
// We'll render a simple list instead of the Command components to match LeySelect's dropdown style
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface LeyComboboxProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

export function LeyCombobox({
  options,
  value,
  onChange,
  placeholder = 'Sélectionner...',
  searchPlaceholder = 'Rechercher...',
  emptyText = 'Aucun résultat.',
  className,
}: LeyComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between font-normal h-12 px-4 rounded-md border-2', className)}
        >
          {value ? selectedLabel : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-1">
        <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
          {options.length === 0 ? (
            <div className="p-3 text-sm text-muted-foreground">{emptyText}</div>
          ) : (
            <ul className="divide-y divide-border">
              {options.map((option) => {
                const selected = value === option.value;
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(selected ? '' : option.value);
                        setOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-4 py-3 flex items-center gap-3 text-sm',
                        selected ? 'bg-primary/5 text-foreground' : 'text-foreground hover:bg-primary/5'
                      )}
                    >
                      <Check className={cn('w-4 h-4', selected ? 'opacity-100 text-primary' : 'opacity-0')} />
                      <span className="truncate">{option.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}