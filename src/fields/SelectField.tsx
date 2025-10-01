import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { BaseFieldProps, SelectOption } from '../types';
import { useFormContext, FieldValues } from 'react-hook-form';

type SelectFieldProps = BaseFieldProps<FieldValues> & {
  options: SelectOption[];
  placeholder?: string;
};

/**
 * A select dropdown field component for forms.
 *
 * @param name - The field name/path
 * @param label - The field label
 * @param options - Array of select options
 * @param placeholder - Placeholder text
 * @param required - Whether the field is required
 * @param disabled - Whether the field is disabled
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * const departmentOptions = [
 *   { value: 'engineering', text: 'Engineering' },
 *   { value: 'marketing', text: 'Marketing' },
 *   { value: 'sales', text: 'Sales' }
 * ];
 *
 * <SelectField
 *   name="department"
 *   label="Department"
 *   options={departmentOptions}
 *   placeholder="Select department"
 *   required
 * />
 * ```
 */
export const SelectField = ({
  name,
  label,
  options,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

SelectField.displayName = 'SelectField';