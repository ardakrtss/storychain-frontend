export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { userDB } from '../../../../lib/firebaseDB.js';

export async function POST(req) {
  try {
    const { nickname, password } = await req.json();

    if (!nickname || !password) {
      return NextResponse.json(
        { ok: false, error: "Kullanıcı adı ve şifre gerekli" },
        { status: 400 }
      );
    }

    // Firebase ile kullanıcı doğrulama
    const user = await userDB.authenticateUser(nickname, password);

    // Başarılı giriş
    const response = NextResponse.json({
      ok: true,
      userId: user.id,
      user: {
        id: user.id,
        nickname: user.nickname,
        createdAt: user.createdAt
      }
    }, { status: 200 });

    // Session cookie ayarla
    response.cookies.set("user_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 gün
    });

    return response;

  } catch (e) {
    console.error("LOGIN_API_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
