import { NextResponse } from "next/server";
import { fetchViewRows, getViewCount } from "@/lib/google-sheets";
import { isAuthorizedCron } from "@/lib/cron-auth";
import { sendWebhooky } from "@/lib/webhooky";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** 22:00 Africa/Casablanca (UTC+1) → cron `0 21 * * *` UTC */
async function buildDailyDigest() {
  const since = Date.now() - 24 * 60 * 60 * 1000;
  const rows = await fetchViewRows();
  const { viewCount: totalViews } = await getViewCount();

  const last24h = rows.filter((row) => {
    if (row.isBot) return false;
    const t = Date.parse(row.timestamp);
    return Number.isFinite(t) && t >= since;
  });

  const pageCounts = new Map<string, number>();
  for (const row of last24h) {
    const key = row.page || "/";
    pageCounts.set(key, (pageCounts.get(key) || 0) + 1);
  }
  const top = Array.from(pageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([p, n]) => `${p === "/" ? "home" : p} (${n})`)
    .join(", ");

  const dateLabel = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Casablanca",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const message = [
    `${last24h.length} vues (24h)`,
    `Total: ${totalViews.toLocaleString("fr-FR")}`,
    top ? `Top: ${top}` : null,
    dateLabel,
  ]
    .filter(Boolean)
    .join(" · ")
    .slice(0, 500);

  return {
    views24h: last24h.length,
    totalViews,
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
