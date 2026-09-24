import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAuthorizedCron } from "@/lib/cron-auth";
import { sendWebhooky } from "@/lib/webhooky";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** 22:00 Africa/Casablanca (UTC+1) → cron `0 21 * * *` UTC */
async function buildDailyDigest() {
  const supabase = createSupabaseServerClient();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count: views24h, error: viewsError } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .gte("created_at", since)
    .or("is_bot.eq.false,is_bot.is.null");

  if (viewsError) throw viewsError;

  const { count: totalRaw, error: totalError } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });

  if (totalError) throw totalError;

  const { data: offsetRow } = await supabase
    .from("stats")
    .select("value")
    .eq("key", "site_views_offset")
    .maybeSingle();

  const offset = Number(offsetRow?.value ?? 0);
  const totalViews = (totalRaw ?? 0) + offset;

  const { count: iphone17Pro24h } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .gte("created_at", since)
    .ilike("device_model", "%iPhone 17 Pro%");

  const { data: topPages } = await supabase
    .from("page_views")
    .select("page")
    .gte("created_at", since)
    .or("is_bot.eq.false,is_bot.is.null")
    .limit(500);

  const pageCounts = new Map<string, number>();
  for (const row of topPages || []) {
    const key = row.page || "/";
    pageCounts.set(key, (pageCounts.get(key) || 0) + 1);
  }
  const top = Array.from(pageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([p, n]) => `${p} (${n})`)
    .join(", ");

  const dateLabel = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Casablanca",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const message = [
    `${views24h ?? 0} vues (24h)`,
    `Total: ${totalViews.toLocaleString("fr-FR")}`,
    `iPhone 17 Pro: ${iphone17Pro24h ?? 0}`,
    top ? `Top: ${top}` : null,
    dateLabel,
  ]
    .filter(Boolean)
    .join(" · ")
    .slice(0, 500);

  return {
    views24h: views24h ?? 0,
    totalViews,
    iphone17Pro24h: iphone17Pro24h ?? 0,
    message,
  };
}

async function handle(request: Request) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const digest = await buildDailyDigest();
    const result = await sendWebhooky({
      title: "Portfolio — bilan 24h",
      message: digest.message,
      sound: "news_ting",
      vibrate: true,
    });

    return NextResponse.json({
      success: result.ok,
      digest,
      webhooky: result,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Daily digest failed";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
