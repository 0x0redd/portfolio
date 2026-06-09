import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FIELDS =
  "id,caption,media_url,media_type,timestamp,permalink,thumbnail_url";

const INSTAGRAM_ACCESS_TOKEN = "IGAAUoRyqhpDFBZAFpQVFpFaEYxMkx2bF9TMkd6S0ZAQWmtsQUhDaTdPUHhVQV9sVnM3TUg4Ynk1YjVSc013Ml9Wd1NJRS15a2NoekozdVI0RFB6Mzl0ZAGo5TjJvUmVudGZAFeGZAZAUEJlNVFMREVJZAW9YMEZAoUDRteXFZAbldLVzA3RQZDZD";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after");
  const limit = searchParams.get("limit") ?? "9";

  try {
    const params = new URLSearchParams({
      fields: FIELDS,
      access_token: INSTAGRAM_ACCESS_TOKEN,
      limit,
    });

    if (after) {
      params.set("after", after);
    }

    const response = await fetch(
      `https://graph.instagram.com/me/media?${params.toString()}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Failed to fetch Instagram feed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch Instagram feed";
    console.error("Instagram API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
