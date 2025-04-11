import { Card, CardContent } from "@/components/ui/card";
import { fetchFormData } from "@/lib/server-functions";
import { cn } from "@/lib/utils";
import { ViewComponent } from "./view";

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
