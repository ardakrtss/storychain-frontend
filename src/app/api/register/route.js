export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// Basit kullanıcı veritabanı (gerçek projede Firebase/Database kullanılır)
let users = [
  {
    id: "1",
    nickname: "demo",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    createdAt: new Date().toISOString()
  }
];

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

    // Kullanıcı adı zaten var mı kontrol et (case-insensitive)
    const existingUser = users.find(u => 
      u.nickname.toLowerCase() === nickname.toLowerCase()
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu kullanıcı adı zaten kullanılıyor" },
        { status: 409 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = {
      id: uuidv4(),
      nickname: nickname.trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Kullanıcıyı kaydet
    users.push(newUser);

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
