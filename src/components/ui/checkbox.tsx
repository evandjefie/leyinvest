import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className={cn(
                'peer h-5 w-5 shrink-0 appearance-none rounded border-2 border-border bg-background transition-all duration-300',
                'checked:bg-primary checked:border-primary',
                'hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
                'disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-destructive',
                className
              )}
              {...props}
            />
            <Check 
              className={cn(
                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white pointer-events-none opacity-0 transition-opacity duration-200',
                'peer-checked:opacity-100'
              )} 
            />
          </div>
          {label && (
            <span className="text-sm text-foreground select-none">{label}</span>
          )}
        </label>
        {error && (
          <p className="text-sm text-destructive ml-8">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
