import { Button } from '../components/ui/button';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
  label?: string;
  loadingLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  width?: 'full' | 'auto';
  className?: string;
};

/**
 * A submit button component for forms.
 *
 * @param label - The button label when not loading
 * @param loadingLabel - The button label when loading
 * @param isLoading - Whether the button is in loading state
 * @param disabled - Whether the button is disabled
 * @param width - Button width ('full' or 'auto')
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <SubmitButton
 *   label="Save Changes"
 *   loadingLabel="Saving..."
 *   isLoading={isSubmitting}
 * />
 * ```
 */
export const SubmitButton = ({
  label = 'Submit',
  loadingLabel = 'Submitting...',
  isLoading = false,
  disabled = false,
  width = 'full',
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn(
        'transition-all duration-200',
        width === 'full' ? 'w-full' : 'w-auto',
        className
      )}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {loadingLabel}
        </div>
      ) : (
        label
      )}
    </Button>
  );
};

SubmitButton.displayName = 'SubmitButton';