import { Field } from "@/lib/types";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const TextField = (input: { field: Field }) => {
  const { field } = input;
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      rules={{
        required: field.validationRules.required,
        minLength: field.validationRules.minLength,
        maxLength: field.validationRules.maxLength,
        pattern: new RegExp(field.validationRules?.pattern || ""),
        min: field.validationRules.min,
        max: field.validationRules.max,
      }}
      render={({ field: renderField }) => (
        <FormItem data-testid="text-field">
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={field.metadata.placeholder}
              {...renderField}
              value={renderField.value ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
