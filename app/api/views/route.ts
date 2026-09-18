import { NextResponse, userAgent } from "next/server";
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
      device_model: ua.device.model ?? null,
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
