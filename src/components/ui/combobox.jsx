import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

export function Combobox({
  items,
  placeholder,
  searchPlaceholder,
  emptyPlaceholder,
  onSelectItem,
  hasCheckIcon,
  showValue,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const onSelectValue = (currentValue) => {
    const item = items.find((el) => el.value === currentValue);

    if (item) {
      setValue(currentValue === value ? '' : currentValue);
      setOpen(false);

      if (onSelectItem) {
        onSelectItem(item);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-7 px-2 w-[200px] justify-between">
          {value && showValue
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={onSelectValue}>
                {hasCheckIcon ? (
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                ) : (
                  <></>
                )}
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
