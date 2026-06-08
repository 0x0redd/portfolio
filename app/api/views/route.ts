import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = 'force-dynamic';

const TESTIMONIALS_SHEET_ID = "17PT7eF7NbNythiSCyRyYeE6UDVtuPGXzGQu1JVbaO0E";
const VIEWS_SHEET_NAME = "views";
const VIEW_COUNT_CELL = `${VIEWS_SHEET_NAME}!H2`;

// Helper function to get Google Sheets client
async function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google credentials");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function GET() {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: TESTIMONIALS_SHEET_ID,
      range: VIEW_COUNT_CELL,
      valueRenderOption: "UNFORMATTED_VALUE",
    });

    const rawValue = response.data.values?.[0]?.[0];
    const viewCount =
      typeof rawValue === "number"
        ? rawValue
        : Number.parseInt(String(rawValue ?? "0"), 10) || 0;

    return NextResponse.json({ viewCount });
  } catch (error: any) {
    console.error("Error fetching view count:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch view count", viewCount: 0 },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { ip, userAgent, timestamp, page } = await request.json();

    const sheets = await getSheetsClient();

    // Get client IP from request headers
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwarded?.split(",")[0] || realIp || ip || "Unknown";

    // Check if views sheet has headers, if not add them
    let hasHeaders = false;
    try {
      const headerCheck = await sheets.spreadsheets.values.get({
        spreadsheetId: TESTIMONIALS_SHEET_ID,
        range: `${VIEWS_SHEET_NAME}!A1:D1`,
      });
      hasHeaders = (headerCheck.data.values?.length ?? 0) > 0;
    } catch (error) {
      // Sheet might not exist
    }

    // Add headers if they don't exist
    if (!hasHeaders) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: TESTIMONIALS_SHEET_ID,
        range: `${VIEWS_SHEET_NAME}!A1:D1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["Timestamp", "IP Address", "User Agent", "Page"]],
        },
      });
    }

    // Append the new view
    await sheets.spreadsheets.values.append({
      spreadsheetId: TESTIMONIALS_SHEET_ID,
      range: `${VIEWS_SHEET_NAME}!A:D`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          timestamp || new Date().toISOString(),
          clientIp,
          userAgent || request.headers.get("user-agent") || "Unknown",
          page || "/",
        ]],
      },
    });

    return NextResponse.json({ success: true, message: "View tracked successfully" });
  } catch (error: any) {
    console.error("Error tracking view:", error);
    return NextResponse.json(
      { error: error.message || "Failed to track view" },
      { status: 500 }
    );
  }
}
