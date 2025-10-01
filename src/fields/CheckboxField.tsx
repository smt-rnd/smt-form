import { useFormContext } from 'react-hook-form';
import { BaseFieldProps } from '../types';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../components/ui/form';
import { Checkbox } from '../components/ui/checkbox';
import { cn } from '../lib/utils';

/**
 * CheckboxField component for boolean input fields.
 *
 * @param name - The field name
 * @param label - The field label
 * @param required - Whether the field is required
 * @param disabled - Whether the field is disabled
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <CheckboxField name="agreeToTerms" label="I agree to the terms" required />
 * ```
 */
export const CheckboxField = ({
  name,
  label,
  required,
  disabled,
  className,
}: BaseFieldProps<any>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-start space-x-3 space-y-0", className)}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              required={required}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && (
              <FormLabel className="text-sm font-normal">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>
            )}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};