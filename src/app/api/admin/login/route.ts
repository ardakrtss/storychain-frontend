export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { setAdminSession, clearAdminSession } from "../../../../lib/adminAuth";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    setAdminSession();
    return NextResponse.json({ ok: true });
  }
  clearAdminSession();
  return NextResponse.json({ ok: false, error: "Geçersiz bilgiler" }, { status: 401 });
}
