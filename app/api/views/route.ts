import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    const { count, error: countError } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    const { data: offsetRow } = await supabase
      .from("stats")
      .select("value")
      .eq("key", "site_views_offset")
      .maybeSingle();

    const offset = Number(offsetRow?.value ?? 0);
    const viewCount = (count ?? 0) + offset;

    return NextResponse.json({ viewCount, rawCount: count ?? 0, offset });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch view count";
    console.error("Error fetching view count:", message);
    return NextResponse.json(
      { error: message, viewCount: 0 },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { ip, userAgent, timestamp, page } = body as {
      ip?: string;
      userAgent?: string;
      timestamp?: string;
      page?: string;
    };

    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwarded?.split(",")[0]?.trim() || realIp || ip || null;

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("page_views").insert({
      ip: clientIp,
      user_agent:
        userAgent || request.headers.get("user-agent") || "Unknown",
      page: page || "/",
      created_at: timestamp || new Date().toISOString(),
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "View tracked successfully",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to track view";
    console.error("Error tracking view:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
