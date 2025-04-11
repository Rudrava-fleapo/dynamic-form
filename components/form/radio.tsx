import { Field } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const RadioField = (input: { field: Field }) => {
  const { field } = input;
  const { control } = useFormContext();
  if (!field.options?.length) return null;
  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: renderField }) => (
        <FormItem data-testid="radio-field">
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <RadioGroup
              {...renderField}
              onChange={(value) => renderField.onChange(value)}
              value={renderField.value}
              defaultValue={field.defaultValue as string}
            >
              {field?.options?.map((option, idx) => (
                <div className="flex items-center space-x-2" key={idx}>
                  <RadioGroupItem value={option.value} id={`opt-${idx}`} />
                  <Label htmlFor={`opt-${idx}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
