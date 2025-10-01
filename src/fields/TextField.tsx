import { Button } from '../components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { BaseFieldProps } from '../types';
import { X } from 'lucide-react';
import { ReactNode } from 'react';
import { useFormContext, FieldValues } from 'react-hook-form';

type TextFieldProps = BaseFieldProps<FieldValues> & {
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';
  action?: () => void;
  icon?: ReactNode;
  loading?: boolean;
  inputClass?: string;
};

/**
 * A text input field component for forms.
 *
 * @param name - The field name/path
 * @param label - The field label
 * @param type - Input type (text, email, number, etc.)
 * @param placeholder - Placeholder text
 * @param required - Whether the field is required
 * @param action - Action button callback
 * @param icon - Custom icon for action button
 * @param loading - Loading state
 * @param disabled - Whether the field is disabled
 * @param className - Additional CSS classes
 * @param inputClass - Additional input CSS classes
 *
 * @example
 * ```tsx
 * <TextField
 *   name="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 * />
 * ```
 */
export const TextField = ({
  name,
  label,
  type = 'text',
  placeholder = 'Enter value',
  required = false,
  action,
  icon = <X size={16} className="text-muted-foreground" />,
  loading,
  disabled = false,
  className,
  inputClass,
}: TextFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel htmlFor={name}>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative flex items-center gap-2">
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className={`w-full ${inputClass} ${action ? 'pr-12' : ''}`}
                id={name}
                disabled={disabled}
              />

              {loading && (
                <div className="absolute right-4 animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600" />
              )}

              {action && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={action}
                  type="button"
                  className="absolute right-0.5 top-0.5"
                  disabled={disabled}
                >
                  {icon}
                </Button>
              )}
            </div>
          </FormControl>

          <FormMessage className="line-clamp-1 text-xs" />
        </FormItem>
      )}
    />
  );
};

TextField.displayName = 'TextField';