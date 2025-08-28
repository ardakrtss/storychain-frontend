export const runtime = "nodejs";

import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { nickname, password, terms, privacy, kvkk } = await req.json();

    // Validasyonlar
    if (!nickname || !password) {
      return NextResponse.json(
        { ok: false, error: "Kullanıcı adı ve şifre gerekli" },
        { status: 400 }
      );
    }

    if (!terms || !privacy || !kvkk) {
      return NextResponse.json(
        { ok: false, error: "Tüm yasal onaylar (Kullanım Şartları, Gizlilik, KVKK) zorunludur." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Şifre en az 6 karakter olmalıdır" },
        { status: 400 }
      );
    }

    // Geçici localStorage tabanlı kullanıcı oluşturma
    const users = JSON.parse(localStorage.getItem('storychain_users') || '[]');
    
    // Kullanıcı adı zaten var mı kontrol et
    const existingUser = users.find(u => 
      u.nickname.toLowerCase() === nickname.toLowerCase()
    );
    
    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: 'Bu kullanıcı adı zaten kullanılıyor' },
        { status: 409 }
      );
    }

    // Yeni kullanıcı oluştur
    const newUser = {
      id: Date.now().toString(),
      nickname: nickname.trim(),
      password: password, // Gerçek projede hash'lenecek
      createdAt: new Date().toISOString(),
      isActive: true,
      role: 'user'
    };

    // Kullanıcıyı kaydet
    users.push(newUser);
    localStorage.setItem('storychain_users', JSON.stringify(users));

    // Başarılı kayıt
    const response = NextResponse.json({
      ok: true,
      userId: newUser.id,
      user: {
        id: newUser.id,
        nickname: newUser.nickname,
        createdAt: newUser.createdAt
      }
    }, { status: 200 });

    // Session cookie ayarla
    response.cookies.set("user_session", newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 gün
    });

    return response;

  } catch (e) {
    console.error("REGISTER_API_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
