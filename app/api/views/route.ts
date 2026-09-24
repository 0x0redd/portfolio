import { NextResponse, userAgent } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { detectIPhone17Pro } from "@/lib/iphone-17-pro";
import { sendWebhooky } from "@/lib/webhooky";

export const dynamic = "force-dynamic";

async function alreadyNotifiedIPhone17Pro(
  ip: string | null
): Promise<boolean> {
  if (!ip) return false;
  const supabase = createSupabaseServerClient();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .eq("ip", ip)
    .ilike("device_model", "%iPhone 17 Pro%")
    .gte("created_at", since);

  if (error) {
    console.warn("iPhone 17 Pro dedupe check failed:", error.message);
    return false;
  }
  // After insert, count includes this visit — notify only on the first one.
  return (count ?? 0) > 1;
}

async function notifyIPhone17ProView(opts: {
  page: string;
  ip: string | null;
  confidence: "high" | "medium";
  label: string;
  reason: string | null;
  timezone?: string | null;
  language?: string | null;
}) {
  const confLabel =
    opts.confidence === "high" ? "confirmed" : "likely (screen match)";
  const bits = [
    `Page: ${opts.page}`,
    opts.ip ? `IP: ${opts.ip}` : null,
    opts.timezone ? `TZ: ${opts.timezone}` : null,
    opts.language ? `Lang: ${opts.language}` : null,
    opts.reason ? opts.reason : null,
    `Confidence: ${confLabel}`,
  ].filter(Boolean);

  const result = await sendWebhooky({
    title: `${opts.label} viewed your site`,
    message: bits.join(" · ").slice(0, 500),
    sound: "level_up_1",
    vibrate: true,
  });

  if (!result.ok && !result.skipped) {
    console.warn("Webhooky iPhone alert failed:", result.error);
  }
}

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

    const {
      ip,
      userAgent: clientUA,
      timestamp,
      page,
      screenWidth,
      screenHeight,
      viewportWidth,
      viewportHeight,
      devicePixelRatio,
      timezone,
      language,
      languages,
      platform,
      hardwareConcurrency,
      deviceMemory,
      connectionType,
      connectionDownlink,
      connectionRtt,
      touchSupport,
      colorScheme,
      referrer: clientReferrer,
      gpuRenderer,
    } = body as {
      ip?: string;
      userAgent?: string;
      timestamp?: string;
      page?: string;
      screenWidth?: number;
      screenHeight?: number;
      viewportWidth?: number;
      viewportHeight?: number;
      devicePixelRatio?: number;
      timezone?: string;
      language?: string;
      languages?: string[];
      platform?: string;
      hardwareConcurrency?: number;
      deviceMemory?: number;
      connectionType?: string;
      connectionDownlink?: number;
      connectionRtt?: number;
      touchSupport?: boolean;
      colorScheme?: string;
      referrer?: string;
      gpuRenderer?: string;
    };

    const headers = request.headers;

    const forwarded = headers.get("x-forwarded-for");
    const realIp = headers.get("x-real-ip");
    const cfIp = headers.get("cf-connecting-ip");
    const clientIp =
      forwarded?.split(",")[0]?.trim() || realIp || cfIp || ip || null;

    const rawUserAgent = clientUA || headers.get("user-agent") || "Unknown";
    const ua = userAgent(request);

    const chUa = headers.get("sec-ch-ua");
    const chUaMobile = headers.get("sec-ch-ua-mobile");
    const chUaPlatform = headers.get("sec-ch-ua-platform");
    const chUaPlatformVersion = headers.get("sec-ch-ua-platform-version");
    const chUaModel = headers.get("sec-ch-ua-model");
    const chUaArch = headers.get("sec-ch-ua-arch");
    const chUaBitness = headers.get("sec-ch-ua-bitness");
    const chUaFullVersionList = headers.get("sec-ch-ua-full-version-list");

    const referer =
      clientReferrer ||
      headers.get("referer") ||
      headers.get("referrer") ||
      null;
    const acceptLanguage = headers.get("accept-language");
    const acceptEncoding = headers.get("accept-encoding");

    const detection = detectIPhone17Pro({
      userAgent: rawUserAgent,
      screenWidth,
      screenHeight,
      devicePixelRatio,
      gpuRenderer,
      touchSupport,
    });

    const deviceModel =
      detection.match && detection.label
        ? detection.label
        : (ua.device.model ?? null);

    const supabase = createSupabaseServerClient();

    const { error } = await supabase.from("page_views").insert({
      ip: clientIp,
      user_agent: rawUserAgent,
      page: page || "/",
      created_at: timestamp || new Date().toISOString(),

      browser_name: ua.browser.name ?? null,
      browser_version: ua.browser.version ?? null,
      os_name: ua.os.name ?? null,
      os_version: ua.os.version ?? null,
      device_type: ua.device.type ?? "desktop",
      device_vendor: ua.device.vendor ?? null,
      device_model: deviceModel,
      engine_name: ua.engine.name ?? null,
      engine_version: ua.engine.version ?? null,
      is_bot: ua.isBot ?? false,

      ch_ua: chUa,
      ch_ua_mobile: chUaMobile,
      ch_ua_platform: chUaPlatform,
      ch_ua_platform_version: chUaPlatformVersion,
      ch_ua_model: chUaModel,
      ch_ua_arch: chUaArch,
      ch_ua_bitness: chUaBitness,
      ch_ua_full_version_list: chUaFullVersionList,

      referer,
      accept_language: acceptLanguage,
      accept_encoding: acceptEncoding,

      screen_width: screenWidth ?? null,
      screen_height: screenHeight ?? null,
      viewport_width: viewportWidth ?? null,
      viewport_height: viewportHeight ?? null,
      device_pixel_ratio: devicePixelRatio ?? null,
      timezone: timezone ?? null,
      language: language ?? null,
      languages: languages ?? null,
      platform: platform ?? null,
      hardware_concurrency: hardwareConcurrency ?? null,
      device_memory: deviceMemory ?? null,
      connection_type: connectionType ?? null,
      connection_downlink: connectionDownlink ?? null,
      connection_rtt: connectionRtt ?? null,
      touch_support: touchSupport ?? null,
      color_scheme: colorScheme ?? null,
    });

    if (error) throw error;

    if (detection.match && detection.label && !ua.isBot) {
      const duplicate = await alreadyNotifiedIPhone17Pro(clientIp);
      if (!duplicate) {
        // Fire-and-forget so tracking stays fast
        void notifyIPhone17ProView({
          page: page || "/",
          ip: clientIp,
          confidence: detection.confidence || "medium",
          label: detection.label,
          reason: detection.reason,
          timezone,
          language,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "View tracked successfully",
      iphone17Pro: detection.match
        ? { confidence: detection.confidence, label: detection.label }
        : null,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to track view";
    console.error("Error tracking view:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
