// 7) app/api/admin/logout/route.ts — çıkış
import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/adminAuth";
export async function POST() {
  clearAdminSession();
  return NextResponse.json({ ok: true });
}
