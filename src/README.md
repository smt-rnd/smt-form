# Reusable Form Library

A comprehensive, type-safe form library built with React, TypeScript, React Hook Form, and Zod validation. This library provides reusable form components that can be easily integrated into any React application.

## Features

- ✅ **Type-Safe**: Full TypeScript support with inferred types from Zod schemas
- ✅ **Validation**: Built-in Zod schema validation with React Hook Form
- ✅ **Reusable Components**: Modular field components for different input types
- ✅ **Form State Management**: External form control with refs
- ✅ **UI Components**: Shadcn/ui based components with Tailwind CSS
- ✅ **Extensible**: Easy to add new field types and customize existing ones
- ✅ **Accessible**: Built with accessibility in mind

## Installation

```bash
npm install react-hook-form @hookform/resolvers zod @radix-ui/react-select lucide-react
```

## Quick Start

```tsx
import { GenericForm, TextField, SelectField, SubmitButton, z } from './lib/forms';

// Define your schema
const userSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Invalid email'),
  department: z.enum(['engineering', 'marketing', 'sales']),
});

// Define options for select fields
const departmentOptions = [
  { value: 'engineering', text: 'Engineering' },
  { value: 'marketing', text: 'Marketing' },
  { value: 'sales', text: 'Sales' },
];

function MyForm() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <GenericForm
      schema={userSchema}
      initialValues={{ name: '', email: '', department: 'engineering' }}
      onSubmit={handleSubmit}
    >
      <TextField name="name" label="Name" required />
      <TextField name="email" label="Email" type="email" required />
      <SelectField
        name="department"
        label="Department"
        options={departmentOptions}
        required
      />
      <SubmitButton />
    </GenericForm>
  );
}
```

## API Reference

### GenericForm

The main form component that handles form state, validation, and submission.

```tsx
<GenericForm
  schema={zodSchema}
  initialValues={initialValues}
  onSubmit={handleSubmit}
  ref={formRef}
  className="custom-class"
>
  {/* Form fields go here */}
</GenericForm>
```

**Props:**
- `schema`: Zod schema for validation
- `initialValues`: Initial form values
- `onSubmit`: Submit handler function
- `ref`: Reference for external form control
- `className`: Additional CSS classes

### Field Components

#### TextField

A text input field component.

```tsx
<TextField
  name="fieldName"
  label="Field Label"
  type="text|email|number|password"
  placeholder="Enter value"
  required
  disabled
/>
```

#### SelectField

A dropdown select field component.

```tsx
<SelectField
  name="fieldName"
  label="Field Label"
  options={[
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' }
  ]}
  placeholder="Select option"
  required
/>
```

#### SubmitButton

A submit button with loading states.

```tsx
<SubmitButton
  label="Submit"
  loadingLabel="Submitting..."
  isLoading={false}
  disabled={false}
  width="full|auto"
/>
```

### Form Control

Access form methods externally using refs:

```tsx
const formRef = useRef<GenericFormRef<FormData>>(null);

// Get current form values
const values = formRef.current?.getValues();

// Reset form
formRef.current?.reset();

// Set specific field value
formRef.current?.setValue('fieldName', 'value');

// Get form state
const { isValid, errors } = formRef.current?.formState;
```

## Advanced Usage

### Custom Field Components

Create custom field components by using the `useFormContext` hook:

```tsx
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';

function CustomField({ name, label }) {
  const { control } = useFormContext();

  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );
}
```

### Complex Validation

Use Zod's powerful validation features:

```tsx
const complexSchema = z.object({
  email: z.email(),
  age: z.number().min(18, 'Must be 18 or older'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

### Dynamic Forms

Use field arrays for dynamic form sections:

```tsx
// Note: FieldArray component would need to be implemented
<FieldArray name="items">
  {({ fields, append, remove }) => (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <TextField name={`items.${index}.name`} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => append({ name: '' })}>Add Item</button>
    </div>
  )}
</FieldArray>
```

## Examples

See the `example/` directory for complete working examples:

- `UserRegistrationForm.tsx`: A comprehensive user registration form

## Styling

The library uses Tailwind CSS and Shadcn/ui components. Customize the appearance by:

1. Modifying the UI components in `components/ui/`
2. Passing custom `className` props
3. Overriding Tailwind classes

## Dependencies

- `react-hook-form`: Form state management
- `@hookform/resolvers`: Zod integration
- `zod`: Schema validation
- `@radix-ui/react-select`: Select component
- `lucide-react`: Icons
- `tailwindcss`: Styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use in your projects!</content>
</xai:function_call