import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Page from "@/app/page";
import { Form } from "@/lib/types";

const mockFormData: Form = {
  title: "Test Form",
  fields: [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      defaultValue: "",
      validationRules: {
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      metadata: {
        placeholder: "Enter your first name",
        tooltip: "Your given name",
      },
    },
    {
      label: "Email Address",
      type: "email",
      name: "email",
      defaultValue: "",
      validationRules: {
        required: true,
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      },
      metadata: {
        placeholder: "Enter your email",
        tooltip: "We will never share your email",
      },
    },
    {
      label: "Age",
      type: "number",
      name: "age",
      defaultValue: null,
      validationRules: {
        required: false,
        min: 18,
        max: 100,
      },
      metadata: {
        placeholder: "Enter your age",
        tooltip: "Age must be between 18 and 100",
      },
    },
    {
      label: "Subscribe to Newsletter",
      type: "checkbox",
      name: "subscribe",
      defaultValue: false,
      validationRules: {
        required: false,
      },
      metadata: {
        tooltip: "Check to receive updates",
      },
    },
    {
      label: "Gender",
      type: "radio",
      name: "gender",
      defaultValue: "",
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
        {
          label: "Other",
          value: "other",
        },
      ],
      validationRules: {
        required: true,
      },
      metadata: {
        tooltip: "Select your gender",
      },
    },
  ],
};

vi.mock("@/lib/server-functions", () => ({
  fetchFormData: vi.fn(() => Promise.resolve(mockFormData)),
}));

test("renders the form", async () => {
  let ui;

  await waitFor(async () => {
    ui = await Page();
  });
  render(ui);

  expect(screen.getByTestId("title").innerHTML).toEqual("Test Form");
  expect(screen.getAllByTestId("text-field").length).toEqual(1);
  expect(screen.getAllByTestId("checkbox-field").length).toEqual(1);
  expect(screen.getAllByTestId("radio-field").length).toEqual(1);
  expect(screen.getAllByTestId("email-field").length).toEqual(1);
  expect(screen.getAllByTestId("number-field").length).toEqual(1);
});
