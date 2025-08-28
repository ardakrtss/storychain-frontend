export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";


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

    // Geçici localStorage tabanlı kullanıcı getirme
    const users = JSON.parse(localStorage.getItem('storychain_users') || '[]');
    const user = users.find(u => u.id === sessionId);

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Kullanıcı bulunamadı" },
        { status: 401 }
      );
    }

    // Şifreyi çıkar
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      ok: true,
      user: userWithoutPassword
    }, { status: 200 });

  } catch (e) {
    console.error("ME_API_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
