import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericFormProps, GenericFormRef } from '../types';
import { Form } from './ui/form';

/**
  * A generic form component that provides a complete form solution with validation,
  * state management, and TypeScript support.
  *
  * @param initialValues - Initial form values
  * @param onSubmit - Submit handler function
  * @param children - Form field components
  * @param ref - Reference to access form methods externally
  * @param className - Additional CSS classes
  *
  * @example
  * ```tsx
  * const MyForm = () => {
  *   const handleSubmit = (data) => console.log(data);
  *
  *   return (
  *     <GenericForm
  *       initialValues={{ name: "", email: "" }}
  *       onSubmit={handleSubmit}
  *     >
  *       <TextField name="name" label="Name" />
  *       <TextField name="email" label="Email" />
  *       <SubmitButton />
  *     </GenericForm>
  *   );
  * };
  * ```
  */
/**
 * GenericForm component with flexible typing.
 * Using 'any' here allows the component to work with any form data structure
 * while maintaining type safety through the schema and initialValues props.
 */
export const GenericForm = forwardRef<
  GenericFormRef<any>,
  GenericFormProps<any>
>(({
  schema,
  initialValues,
  onSubmit,
  children,
  className,
}, ref) => {
  const form = useForm({
    defaultValues: initialValues,
    resolver: schema ? zodResolver(schema as any) : undefined,
  });

  useImperativeHandle(ref, () => ({
    getValues: form.getValues,
    reset: (values) => form.reset(values),
    setValue: (name, value) => form.setValue(name, value),
    formState: form.formState,
    control: form.control,
    form: form,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
      >
        {children}
      </form>
    </Form>
  );
});

GenericForm.displayName = 'GenericForm';