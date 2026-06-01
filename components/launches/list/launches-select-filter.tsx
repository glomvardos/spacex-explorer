import { LaunchesFilterField } from '@/components/launches/list/launches-filter-field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type LaunchesSelectFilterProps<TValue extends string> = {
  id: string;
  label: string;
  onValueChange: (value: TValue) => void;
  options: { label: string; value: TValue }[];
  value: TValue;
};

export function LaunchesSelectFilter<TValue extends string>({
  id,
  label,
  onValueChange,
  options,
  value,
}: LaunchesSelectFilterProps<TValue>) {
  function handleValueChange(nextValue: string) {
    const selectedOption = options.find((option) => option.value === nextValue);

    if (selectedOption) {
      onValueChange(selectedOption.value);
    }
  }

  return (
    <LaunchesFilterField htmlFor={id} label={label}>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </LaunchesFilterField>
  );
}
