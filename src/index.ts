// Main exports
export { GenericForm } from './components/GenericForm';

// Field components
export { TextField } from './fields/TextField';
export { SelectField } from './fields/SelectField';
export { CheckboxField } from './fields/CheckboxField';
export { SubmitButton } from './fields/SubmitButton';

// Types
export type {
  GenericFormRef,
  GenericFormProps,
  BaseFieldProps,
  SelectOption,
  SMTFormContext,
} from './types';

// Example components
export { UserRegistrationForm } from './example/UserRegistrationForm';

// Re-export commonly used dependencies for convenience
export { z } from 'zod';