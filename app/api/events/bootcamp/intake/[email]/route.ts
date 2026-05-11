import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  const { email: rawEmail } = await params;
  const email = decodeURIComponent(rawEmail).trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(
      { error: "service_unavailable" },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("bootcamp_intake")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("[intake GET] supabase error", error);
    return NextResponse.json({ error: "lookup_failed" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}
