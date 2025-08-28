export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { userDB } from '../../../../lib/firebaseDB.js';

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("user_session")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: "Oturum bulunamadı" },
        { status: 401 }
      );
    }

    // Firebase'den kullanıcı getirme
    const user = await userDB.getUserById(sessionId);

    return NextResponse.json({
      ok: true,
      user: user
    }, { status: 200 });

  } catch (e) {
    console.error("ME_API_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
