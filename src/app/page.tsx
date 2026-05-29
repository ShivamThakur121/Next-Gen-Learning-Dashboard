import { getCourses } from "@/lib/supabase";
import DashboardShell from "@/components/DashboardShell";

// Force Next.js to render this component dynamically (ensures fresh Supabase fetches on every refresh!)
export const dynamic = "force-dynamic";

export default async function Page() {
  // Query Supabase server-side! 
  // Next.js Server Components securely execute this database query directly from the server.
  const result = await getCourses();

  return (
    <DashboardShell
      courses={result.courses}
      isMock={result.isMock}
      error={result.error}
    />
  );
}
