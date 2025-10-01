# smt-form

[![npm version](https://badge.fury.io/js/smt-form.svg)](https://badge.fury.io/js/smt-form)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive, type-safe form library for React with Zod validation and Tailwind CSS styling. Built for modern React applications with excellent developer experience.

## ✨ Features

- ✅ **Type-Safe**: Full TypeScript support with inferred types from Zod schemas
- ✅ **Validation**: Built-in Zod schema validation with React Hook Form
- ✅ **Reusable Components**: Modular field components for different input types
- ✅ **Form State Management**: External form control with refs
- ✅ **UI Components**: Shadcn/ui based components with Tailwind CSS
- ✅ **Extensible**: Easy to add new field types and customize existing ones
- ✅ **Accessible**: Built with proper ARIA attributes and keyboard navigation
- ✅ **Tree-Shakable**: Only import what you need
- ✅ **Zero Dependencies**: All peer dependencies are optional

## 🚀 Installation

```bash
npm install smt-form
```

### Peer Dependencies

Install the required peer dependencies:

```bash
npm install react react-dom react-hook-form @hookform/resolvers zod tailwindcss @radix-ui/react-select lucide-react class-variance-authority clsx tailwind-merge
```

## 📖 Quick Start

```tsx
import { GenericForm, TextField, SelectField, SubmitButton, z } from 'smt-form';

// Define your schema
const userSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
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

## 🎯 API Reference

### GenericForm

The main form component that handles form state, validation, and submission.

```tsx
import { GenericForm } from 'smt-form';

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

A versatile text input field component.

```tsx
import { TextField } from 'smt-form';

<TextField
  name="fieldName"
  label="Field Label"
  type="text|email|number|password|tel|url"
  placeholder="Enter value"
  required
  disabled
/>
```

#### SelectField

A dropdown select field component.

```tsx
import { SelectField } from 'smt-form';

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
import { SubmitButton } from 'smt-form';

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
import { useRef } from 'react';
import { GenericFormRef } from 'smt-form';

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

## 🎨 Styling

The library uses Tailwind CSS classes and can be customized by:

1. **Modifying component classes**: Pass custom `className` props
2. **Overriding Tailwind classes**: Customize your Tailwind config
3. **Theme customization**: The components use CSS variables for theming

### Required Tailwind Configuration

Make sure your `tailwind.config.js` includes:

```js
module.exports = {
  content: [
    // ... your content
    './node_modules/smt-form/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ... your theme extensions
    },
  },
  plugins: [],
}
```

## 🔧 Advanced Usage

### Custom Field Components

Create custom field components by using the `useFormContext` hook:

```tsx
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from 'smt-form/components/ui/form';

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
  email: z.string().email(),
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

### Form Arrays

Support for dynamic arrays (coming in future versions):

```tsx
// FieldArray component will be available in future versions
<FieldArray name="items">
  {({ fields, append, remove }) => (
    <div>
      {fields.map((field, index) => (
        <TextField key={field.id} name={`items.${index}.name`} />
      ))}
    </div>
  )}
</FieldArray>
```

## 📦 Bundle Analysis

- **ESM**: Modern ES modules for tree-shaking
- **CJS**: CommonJS for older bundlers
- **TypeScript**: Full type definitions included
- **Minimal**: Only includes necessary components

## 🧪 Testing

The library is designed to work seamlessly with testing frameworks:

```tsx
import { render, screen } from '@testing-library/react';
import { GenericForm, TextField, SubmitButton } from 'smt-form';

test('renders form with fields', () => {
  render(
    <GenericForm schema={schema} initialValues={values} onSubmit={jest.fn()}>
      <TextField name="name" label="Name" />
      <SubmitButton />
    </GenericForm>
  );

  expect(screen.getByLabelText('Name')).toBeInTheDocument();
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React Hook Form](https://react-hook-form.com/)
- Validation powered by [Zod](https://zod.dev/)
- UI components inspired by [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Support

- 📖 [Documentation](https://smt-form.dev)
- 🐛 [Bug Reports](https://github.com/yourusername/smt-form/issues)
- 💬 [Discussions](https://github.com/yourusername/smt-form/discussions)
- 📧 [Email Support](mailto:support@smt-form.dev)

---

Made with ❤️ for the React community</content>
</xai:function_call