import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/lib/types";
import { cn, url } from "@/lib/utils";
import { ViewComponent } from "./view";

export default async function Home() {
  const formData = await fetch(url("/api/form"));
  const response = await formData.json();
  if (!formData.ok) {
    return (
      <div className={cn(" w-screen min-h-screen grid place-items-center")}>
        <Card className="w-[90%] ">
          <CardContent>
            <p>Failed to fetch form data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (response.data.form)
    return <ViewComponent data={response.data.form as Form} />;
}
