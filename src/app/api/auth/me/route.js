export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";


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

    // Geçici localStorage tabanlı kullanıcı getirme
    const users = JSON.parse(localStorage.getItem('storychain_users') || '[]');
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
