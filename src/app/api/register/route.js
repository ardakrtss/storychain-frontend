export const runtime = "nodejs";

import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { nickname, password, terms, privacy, kvkk } = await req.json();

    // Validasyonlar
    if (!nickname || !password) {
      return NextResponse.json(
        { error: "Kullanıcı adı ve şifre gerekli" },
        { status: 400 }
      );
    }

    if (!terms || !privacy || !kvkk) {
      return NextResponse.json(
        { error: "Tüm yasal onaylar (Kullanım Şartları, Gizlilik, KVKK) zorunludur." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter olmalıdır" },
        { status: 400 }
      );
    }

    // Basit kullanıcı oluşturma (geçici)
    const newUser = {
      id: Date.now().toString(),
      nickname: nickname.trim(),
      password: password,
      createdAt: new Date().toISOString()
    };

    // Başarılı kayıt
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        nickname: newUser.nickname,
        createdAt: newUser.createdAt
      }
    });

    // Session cookie ayarla
    response.cookies.set("user_session", newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 gün
    });

    return response;

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
