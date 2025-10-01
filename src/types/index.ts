import React from 'react';
import { Control, FieldValues, FormState, UseFormReturn, Path } from 'react-hook-form';
import { z } from 'zod';

// Base field props
export interface BaseFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// Generic form ref interface
export interface GenericFormRef<T extends FieldValues> {
  getValues: () => T;
  reset: (values?: Partial<T>) => void;
  setValue: (name: Path<T>, value: unknown) => void;
  formState: FormState<T>;
  control: Control<T>;
  form: UseFormReturn<T>;
}

// Generic form props
export interface GenericFormProps<T extends FieldValues> {
  schema?: z.ZodSchema<T>;
  initialValues: Partial<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  ref?: React.Ref<GenericFormRef<T>>;
  className?: string;
}

// Form context type
export interface SMTFormContext<TFormValues extends FieldValues = FieldValues> {
  control: Control<TFormValues>;
}

// Field array props
export interface FieldArrayProps {
  children: (field: Record<string, unknown>) => React.ReactNode;
  name: string;
}

// Select field options
export interface SelectOption {
  value: string;
  text: string;
  disabled?: boolean;
}

// Button variants for form actions
export type FormButtonVariant = 'submit' | 'reset' | 'cancel';

// Export commonly used types
export type { FieldValues, Control, FormState, UseFormReturn, Path };