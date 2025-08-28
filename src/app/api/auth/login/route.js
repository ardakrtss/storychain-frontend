export const runtime = "nodejs";

import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { nickname, password } = await req.json();

    if (!nickname || !password) {
      return NextResponse.json(
        { error: "Kullanıcı adı ve şifre gerekli" },
        { status: 400 }
      );
    }

    // Basit doğrulama (geçici)
    if (nickname === "demo" && password === "password") {
      const user = {
        id: "1",
        nickname: "demo",
        createdAt: new Date().toISOString()
      };

      // Başarılı giriş
      const response = NextResponse.json({
        success: true,
        user: user
      });

          // Session cookie ayarla
      response.cookies.set("user_session", user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 // 7 gün
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı veya şifre yanlış" },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
