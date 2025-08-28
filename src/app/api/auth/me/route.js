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

    // Basit kullanıcı kontrolü (geçici)
    if (sessionId === "1") {
      const user = {
        id: "1",
        nickname: "demo",
        createdAt: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        user: user
      });
    } else {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
