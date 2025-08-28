export const runtime = "nodejs";

import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { nickname, password } = await req.json();

    if (!nickname || !password) {
      return NextResponse.json(
        { ok: false, error: "Kullanıcı adı ve şifre gerekli" },
        { status: 400 }
      );
    }

    // Geçici localStorage tabanlı doğrulama
    const users = JSON.parse(localStorage.getItem('storychain_users') || '[]');
    
    // Demo kullanıcı ekle (eğer yoksa)
    if (!users.find(u => u.nickname === 'demo')) {
      users.push({
        id: '1',
        nickname: 'demo',
        password: 'password',
        createdAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      });
      localStorage.setItem('storychain_users', JSON.stringify(users));
    }

    // Kullanıcıyı bul
    const user = users.find(u => 
      u.nickname.toLowerCase() === nickname.toLowerCase() && 
      u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Kullanıcı bulunamadı veya şifre yanlış' },
        { status: 401 }
      );
    }

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
