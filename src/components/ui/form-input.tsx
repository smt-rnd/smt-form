import { UseFormReturn, FieldValues } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";


type FormInputProps = {
    form: UseFormReturn<FieldValues>;
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
};

export default function FormInput({ form, name, label, placeholder, description }: FormInputProps) {
    return (

        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormDescription>
                {description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
    )
}