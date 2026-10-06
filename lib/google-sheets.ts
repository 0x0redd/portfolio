import { randomUUID } from "crypto";
import { google, type sheets_v4 } from "googleapis";

/** Same spreadsheet as testimonials; views live on the `views` tab. */
export const VIEWS_SPREADSHEET_ID =
  process.env.GOOGLE_VIEWS_SHEET_ID ||
  "17PT7eF7NbNythiSCyRyYeE6UDVtuPGXzGQu1JVbaO0E";

export const VIEWS_SHEET_NAME = process.env.GOOGLE_VIEWS_SHEET_NAME || "views";

/** Added to raw sheet rows for display (legacy portfolio offset). */
export const SITE_VIEWS_OFFSET = Number(
  process.env.SITE_VIEWS_OFFSET ?? 2000
);

/**
 * Column order matching the old Supabase `page_views` table.
 * Keep sheet header row 1 in this exact order.
 */
export const VIEW_HEADERS = [
  "id",
  "ip",
  "user_agent",
  "page",
  "created_at",
  "browser_name",
  "browser_version",
  "os_name",
  "os_version",
  "device_type",
  "device_vendor",
  "device_model",
  "engine_name",
  "engine_version",
  "is_bot",
  "ch_ua",
  "ch_ua_mobile",
  "ch_ua_platform",
  "ch_ua_platform_version",
  "ch_ua_model",
  "ch_ua_arch",
  "ch_ua_bitness",
  "ch_ua_full_version_list",
  "referer",
  "accept_language",
  "accept_encoding",
  "screen_width",
  "screen_height",
  "viewport_width",
  "viewport_height",
  "device_pixel_ratio",
  "timezone",
  "language",
  "languages",
  "platform",
  "hardware_concurrency",
  "device_memory",
  "connection_type",
  "connection_downlink",
  "connection_rtt",
  "touch_support",
  "color_scheme",
] as const;

export type ViewHeader = (typeof VIEW_HEADERS)[number];

export type PageViewRecord = {
  id?: string;
  ip?: string | null;
  user_agent?: string | null;
  page?: string | null;
  created_at?: string | null;
  browser_name?: string | null;
  browser_version?: string | null;
  os_name?: string | null;
  os_version?: string | null;
  device_type?: string | null;
  device_vendor?: string | null;
  device_model?: string | null;
  engine_name?: string | null;
  engine_version?: string | null;
  is_bot?: boolean | null;
  ch_ua?: string | null;
  ch_ua_mobile?: string | null;
  ch_ua_platform?: string | null;
  ch_ua_platform_version?: string | null;
  ch_ua_model?: string | null;
  ch_ua_arch?: string | null;
  ch_ua_bitness?: string | null;
  ch_ua_full_version_list?: string | null;
  referer?: string | null;
  accept_language?: string | null;
  accept_encoding?: string | null;
  screen_width?: number | null;
  screen_height?: number | null;
  viewport_width?: number | null;
  viewport_height?: number | null;
  device_pixel_ratio?: number | null;
  timezone?: string | null;
  language?: string | null;
  languages?: string[] | null;
  platform?: string | null;
  hardware_concurrency?: number | null;
  device_memory?: number | null;
  connection_type?: string | null;
  connection_downlink?: number | null;
  connection_rtt?: number | null;
  touch_support?: boolean | null;
  color_scheme?: string | null;
};

export type ViewRow = {
  timestamp: string;
  page: string;
  isBot: boolean;
};

const LAST_COL = columnLetter(VIEW_HEADERS.length);

function columnLetter(index1Based: number): string {
  let n = index1Based;
  let s = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function cellValue(value: unknown): string | number | boolean {
  if (value == null) return "";
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : "";
  if (Array.isArray(value)) return JSON.stringify(value);
  return String(value);
}

function recordToRow(record: PageViewRecord): (string | number | boolean)[] {
  const withDefaults: PageViewRecord = {
    ...record,
    id: record.id || randomUUID(),
    page: record.page || "/",
    created_at: record.created_at || new Date().toISOString(),
  };

  return VIEW_HEADERS.map((key) => cellValue(withDefaults[key]));
}

export async function getSheetsClient(): Promise<sheets_v4.Sheets> {
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

function headerIndexMap(headerRow: string[]): Map<string, number> {
  const map = new Map<string, number>();
  headerRow.forEach((raw, i) => {
    const key = String(raw || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");
    if (key) map.set(key, i);
  });
  return map;
}

function pick(
  row: string[],
  headers: Map<string, number>,
  ...aliases: string[]
): string {
  for (const alias of aliases) {
    const idx = headers.get(alias);
    if (idx != null && row[idx] != null && row[idx] !== "") {
      return String(row[idx]);
    }
  }
  return "";
}

/** Raw view rows (excludes header). Used by cron digest. */
export async function fetchViewRows(): Promise<ViewRow[]> {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: VIEWS_SPREADSHEET_ID,
    range: `${VIEWS_SHEET_NAME}!A:${LAST_COL}`,
  });

  const rows = response.data.values || [];
  if (rows.length <= 1) return [];

  const headers = headerIndexMap(rows[0].map(String));
  // Fallbacks if headers are positional only (created_at=E, page=D, is_bot=O)
  const createdAtIdx = headers.get("created_at") ?? 4;
  const pageIdx = headers.get("page") ?? 3;
  const isBotIdx = headers.get("is_bot") ?? 14;

  return rows.slice(1).map((row) => {
    const cells = row.map(String);
    const isBotRaw =
      pick(cells, headers, "is_bot") || String(cells[isBotIdx] || "");
    return {
      timestamp:
        pick(cells, headers, "created_at", "timestamp") ||
        String(cells[createdAtIdx] || ""),
      page:
        pick(cells, headers, "page") || String(cells[pageIdx] || "/") || "/",
      isBot:
        isBotRaw === "TRUE" ||
        isBotRaw.toLowerCase() === "true" ||
        isBotRaw === "1",
    };
  });
}

export async function getViewCount(): Promise<{
  rawCount: number;
  viewCount: number;
  offset: number;
}> {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: VIEWS_SPREADSHEET_ID,
    range: `${VIEWS_SHEET_NAME}!A:A`,
  });

  const rows = response.data.values || [];
  const rawCount = rows.length > 1 ? rows.length - 1 : 0;
  return {
    rawCount,
    offset: SITE_VIEWS_OFFSET,
    viewCount: rawCount + SITE_VIEWS_OFFSET,
  };
}

export async function appendView(record: PageViewRecord): Promise<void> {
  const sheets = await getSheetsClient();

  let hasHeaders = false;
  try {
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: VIEWS_SPREADSHEET_ID,
      range: `${VIEWS_SHEET_NAME}!A1:${LAST_COL}1`,
    });
    hasHeaders = (headerCheck.data.values?.length ?? 0) > 0;
  } catch {
    // Sheet tab may be empty
  }

  // Only write headers if the sheet is empty (you already edited them).
  if (!hasHeaders) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: VIEWS_SPREADSHEET_ID,
      range: `${VIEWS_SHEET_NAME}!A1:${LAST_COL}1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [Array.from(VIEW_HEADERS)],
      },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: VIEWS_SPREADSHEET_ID,
    range: `${VIEWS_SHEET_NAME}!A:${LAST_COL}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [recordToRow(record)],
    },
  });
}
