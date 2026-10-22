import { NextResponse } from "next/server";
import { appendComment, fetchComments } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await fetchComments();
    return NextResponse.json({ testimonials });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch testimonials";
    console.error("Error fetching testimonials:", message);
    return NextResponse.json({ testimonials: [], error: message }, { status: 200 });
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

    const trimmedName = String(name).trim().slice(0, 120);
    const trimmedComment = String(comment).trim().slice(0, 2000);

    if (!trimmedName || !trimmedComment) {
      return NextResponse.json(
        { error: "Name and comment are required" },
        { status: 400 }
      );
    }

    const testimonial = await appendComment(trimmedName, trimmedComment);

    return NextResponse.json({
      success: true,
      message: "Comment added successfully",
      testimonial,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to add comment";
    console.error("Error adding testimonial:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
