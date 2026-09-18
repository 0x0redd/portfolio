import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("comments")
      .select("id, name, comment, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const testimonials = (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      comment: row.comment,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ testimonials });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch testimonials";
    console.error("Error fetching testimonials:", message);
    return NextResponse.json({ error: message }, { status: 500 });
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

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("comments")
      .insert({ name: trimmedName, comment: trimmedComment })
      .select("id, name, comment, created_at")
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Comment added successfully",
      testimonial: {
        id: data.id,
        name: data.name,
        comment: data.comment,
        createdAt: data.created_at,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to add comment";
    console.error("Error adding testimonial:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
