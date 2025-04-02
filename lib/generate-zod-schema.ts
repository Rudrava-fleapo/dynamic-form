import { z } from "zod";
import { Field } from "./types";

const addTextFieldValidation = (
  schema: z.ZodString,
  validationRules: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  }
) => {
  if (validationRules.minLength) {
    schema = schema.min(
      validationRules.minLength,
      `Must be at least ${validationRules.minLength} characters long`
    );
  }
  if (validationRules.maxLength) {
    schema = schema.max(
      validationRules.maxLength,
      `Must be at most ${validationRules.maxLength} characters long`
    );
  }
  if (validationRules.pattern) {
    schema = schema.regex(
      new RegExp(validationRules.pattern),
      `Must match the pattern: ${validationRules.pattern}`
    );
  }
  return schema;
};

const addNumberFieldValidation = (
  schema: z.ZodNumber,
  validationRules: {
    min?: number;
    max?: number;
  }
) => {
  if (validationRules.min !== undefined) {
    schema = schema.min(
      validationRules.min,
      `Must be greater than or equal to ${validationRules.min}`
    );
  }
  if (validationRules.max !== undefined) {
    schema = schema.max(
      validationRules.max,
      `Must be less than or equal to ${validationRules.max}`
    );
  }
  return schema;
};

export const generateZodSchema = (fields: Field[]) => {
  const zodSchema = fields.reduce(
    (acc: Record<string, z.ZodTypeAny>, field) => {
      const { name, type, validationRules } = field;
      let schema;

      switch (type) {
        case "text":
          schema = z.string();
          schema = addTextFieldValidation(schema, validationRules);
          break;
        case "email":
          schema = z.string().email("Must be a valid email address");
          schema = addTextFieldValidation(schema, validationRules);
          break;
        case "number":
          schema = z.number();
          schema = addNumberFieldValidation(schema, validationRules);
          break;
        // Add more cases for different field types as needed
        default:
          schema = z.unknown();
          break;
      }

      if (!validationRules.required) {
        schema = schema.optional();
      } else {
        schema = schema.refine((val) => val !== undefined, {
          message: `${name} is required`,
        });
      }

      acc[name] = schema;

      return acc;
    },
    {}
  );

  return z.object(zodSchema);
};
