import { createClient } from "@supabase/supabase-js";

// Course Interface matching database schema and typescript types
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verify if live Supabase keys are configured
export const isLiveConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== "your-supabase-project-url");

// Create live Supabase client if configured
export const supabase = isLiveConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Premium mock courses matching seed requirement
export const MOCK_COURSES: Course[] = [
  {
    id: "e4c84a86-7a1a-4d7a-8bf8-028f32279bca",
    title: "Advanced React & Render Optimizations",
    progress: 78,
    icon_name: "Atom",
    created_at: new Date().toISOString(),
  },
  {
    id: "f8c9b2f6-3b1a-4c28-9f1c-928d11c03eab",
    title: "Next.js Production Architecture & RSCs",
    progress: 45,
    icon_name: "Layers",
    created_at: new Date().toISOString(),
  },
  {
    id: "a2b3c4d5-e6f7-8901-2345-67890abcdef1",
    title: "Framer Motion Masterclass: Advanced Physics",
    progress: 90,
    icon_name: "Sparkles",
    created_at: new Date().toISOString(),
  },
  {
    id: "c4d5e6f7-a8b9-0123-4567-890123abcdef",
    title: "High Performance Postgres & DB Scaling",
    progress: 25,
    icon_name: "Database",
    created_at: new Date().toISOString(),
  },
];

export interface FetchResult {
  courses: Course[];
  isMock: boolean;
  error: string | null;
}

/**
 * Server Component Helper to fetch courses.
 * Attempts to pull from live Supabase DB first, then falls back to local mocks if keys are missing or query fails.
 */
export async function getCourses(): Promise<FetchResult> {
  // If not configured, immediately return mock data
  if (!supabase) {
    // Artificial small delay to trigger the Loading Skeleton and let the user see the gorgeous transitions!
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      courses: MOCK_COURSES,
      isMock: true,
      error: null,
    };
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase Query Error - Falling back to Mocks:", error);
      return {
        courses: MOCK_COURSES,
        isMock: true,
        error: `Supabase Error: ${error.message} (Using local demo data fallback)`,
      };
    }

    if (!data || data.length === 0) {
      return {
        courses: MOCK_COURSES,
        isMock: true,
        error: "Supabase table exists but has no rows. (Using local demo data fallback)",
      };
    }

    return {
      courses: data as Course[],
      isMock: false,
      error: null,
    };
  } catch (err: any) {
    console.error("Supabase Database connection failed - Falling back to Mocks:", err);
    return {
      courses: MOCK_COURSES,
      isMock: true,
      error: `Network/Connection Error: ${err.message || err} (Using local demo data fallback)`,
    };
  }
}
