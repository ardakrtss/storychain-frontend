export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Basit kullanıcı veritabanı (gerçek projede Firebase/Database kullanılır)
const users = [
  {
    id: "1",
    nickname: "demo",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    createdAt: new Date().toISOString()
  }
];

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("user_session")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Oturum bulunamadı" },
        { status: 401 }
      );
    }

    // Kullanıcıyı bul
    const user = users.find(u => u.id === sessionId);

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 401 }
      );
    }

    // Şifreyi çıkar
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
