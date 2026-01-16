import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = 'force-dynamic';

const TESTIMONIALS_SHEET_ID = "17PT7eF7NbNythiSCyRyYeE6UDVtuPGXzGQu1JVbaO0E";

export async function GET() {
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      return NextResponse.json(
        { error: "Missing Google credentials" },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Try to get the first sheet name, or use Sheet1 as default
    let sheetName = "Sheet1";
    try {
      const sheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: TESTIMONIALS_SHEET_ID,
      });
      if (sheetInfo.data.sheets && sheetInfo.data.sheets.length > 0) {
        sheetName = sheetInfo.data.sheets[0].properties?.title || "Sheet1";
      }
    } catch (error) {
      console.log("Could not get sheet name, using default Sheet1");
    }

    // Fetch data - assuming columns: Quote, Name, Title (or similar)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: TESTIMONIALS_SHEET_ID,
      range: `${sheetName}!A:B`, 
    });

    const rows = response.data.values || [];

    if (rows.length <= 1) {
      return NextResponse.json({ testimonials: [] });
    }

    // Skip header row and map to testimonial objects
    const testimonials = rows.slice(1).map((row: any[]) => ({
      name: row[0] || "",
      comment: row[1] || "",
    })).filter((testimonial: { name: string; comment: string }) => testimonial.comment && testimonial.name); // Filter out empty rows

    return NextResponse.json({ testimonials });
  } catch (error: any) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, comment } = await request.json();

    if (!name || !comment) {
      return NextResponse.json(
        { error: "Name and comment are required" },
        { status: 400 }
      );
    }

    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      return NextResponse.json(
        { error: "Missing Google credentials" },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Try to get the first sheet name, or use Sheet1 as default
    let sheetName = "Sheet1";
    try {
      const sheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: TESTIMONIALS_SHEET_ID,
      });
      if (sheetInfo.data.sheets && sheetInfo.data.sheets.length > 0) {
        sheetName = sheetInfo.data.sheets[0].properties?.title || "Sheet1";
      }
    } catch (error) {
      console.log("Could not get sheet name, using default Sheet1");
    }

    // Append the new row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: TESTIMONIALS_SHEET_ID,
      range: `${sheetName}!A:B`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, comment]],
      },
    });

    return NextResponse.json({ success: true, message: "Comment added successfully" });
  } catch (error: any) {
    console.error("Error adding testimonial:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add comment" },
      { status: 500 }
    );
  }
}

