import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/lib/types";
import { cn, url } from "@/lib/utils";
import { ViewComponent } from "./view";

async function fetchFormData(): Promise<Form | null> {
  try {
    const formData = await fetch(url("/api/form"), { cache: "no-store" }); // no-store ensures fresh data
    if (!formData.ok) {
      return null;
    }
    const response = await formData.json();
    return response.data.form as Form;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return null;
  }
}

export default async function Home() {
  const formData = await fetchFormData();

  if (!formData) {
    return (
      <div className={cn("w-screen min-h-screen grid place-items-center")}>
        <Card className="w-[90%]">
          <CardContent>
            <p>Failed to fetch form data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ViewComponent data={formData} />;
}
