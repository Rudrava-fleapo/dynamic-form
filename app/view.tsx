"use client";
import { RenderFields } from "@/components/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Form as FormType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

import { generateZodSchema } from "@/lib/generate-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export const ViewComponent: React.FC<{ data: FormType }> = ({ data }) => {
  const formSchema = generateZodSchema(data.fields);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className={cn(" w-screen min-h-screen grid place-items-center")}>
      <Card className="w-[90%] ">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <RenderFields fields={data.fields} />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
