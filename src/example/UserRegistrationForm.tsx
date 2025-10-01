import { useRef } from 'react';
import { z } from 'zod';
import { GenericForm } from '../components/GenericForm';
import { GenericFormRef } from '../types';
import { TextField } from '../fields/TextField';
import { SelectField } from '../fields/SelectField';
import { SubmitButton } from '../fields/SubmitButton';

// Define the form schema using Zod
const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  department: z.enum(['engineering', 'marketing', 'sales', 'hr']),
  role: z.string().min(1, 'Role is required'),
});

// Type inference from schema
type UserFormData = z.infer<typeof userSchema>;

// Department options for select field
const departmentOptions = [
  { value: 'engineering', text: 'Engineering' },
  { value: 'marketing', text: 'Marketing' },
  { value: 'sales', text: 'Sales' },
  { value: 'hr', text: 'Human Resources' },
];

// Initial form values
const initialValues: UserFormData = {
  firstName: '',
  lastName: '',
  email: '',
  department: 'engineering',
  role: '',
};

/**
 * A comprehensive user registration form example demonstrating
 * the reusable form library capabilities.
 *
 * Features:
 * - Type-safe form handling with Zod validation
 * - Multiple field types (text, email, select)
 * - Form state management and external control
 * - Loading states and error handling
 * - Responsive design
 */
export const UserRegistrationForm = () => {
  // Reference to access form methods externally
  const formRef = useRef<GenericFormRef<UserFormData>>(null);

  // Handle form submission
  const handleSubmit = async (_data: UserFormData) => {
    // Simulate API call with a delay
    await new Promise<void>(resolve => resolve());

    // Reset form after successful submission
    formRef.current?.reset();

    // In a real application, you would handle the success state here
    // For example: show a success message, redirect, etc.
  };

  // Handle form reset
  const handleReset = () => {
    formRef.current?.reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          User Registration
        </h2>
        <p className="text-gray-600">
          Fill out the form below to create a new user account.
        </p>
      </div>

      <GenericForm
        ref={formRef}
        schema={userSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            required
          />

          <TextField
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Email Field */}
        <TextField
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          required
        />

        {/* Department Selection */}
        <SelectField
          name="department"
          label="Department"
          options={departmentOptions}
          placeholder="Select your department"
          required
        />

        {/* Role Field */}
        <TextField
          name="role"
          label="Job Role"
          placeholder="Enter your job role"
          required
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <SubmitButton
            label="Register User"
            loadingLabel="Creating Account..."
            className="bg-blue-600 hover:bg-blue-700 text-white"
          />

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Reset Form
          </button>
        </div>
      </GenericForm>

      {/* Form Status Display */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Form Status</h3>
        <div className="text-sm text-gray-600">
          <p>Form is ready for input. Fill out all required fields and submit.</p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;