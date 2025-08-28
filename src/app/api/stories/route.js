export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { moderateStory } from "../../../lib/moderation.js";

// Hikaye oluşturma
export async function POST(req) {
  try {
    const { title, content, theme, authorId, authorNickname } = await req.json();

    // Validasyonlar
    if (!title || !content || !theme || !authorId || !authorNickname) {
      return NextResponse.json(
        { error: "Tüm alanlar gerekli" },
        { status: 400 }
      );
    }

    // Moderasyon kontrolü
    const moderationResult = moderateStory({ title, content });
    if (!moderationResult.ok) {
      return NextResponse.json(
        { error: moderationResult.reason },
        { status: 400 }
      );
    }

    // Firebase ile hikaye oluştur
    const { storyDB } = await import('../../../lib/firebaseDB.js');
    const result = await storyDB.createStory({
      title,
      content,
      theme,
      authorId,
      authorNickname
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      story: result.story
    });

  } catch (error) {
    console.error("Hikaye oluşturma hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

// Hikayeleri getirme
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'completed';
    const limit = parseInt(searchParams.get('limit')) || 20;

    let result;

    const { storyDB } = await import('../../../lib/firebaseDB.js');
    
    switch (type) {
      case 'popular':
        result = await storyDB.getPopularStories(limit);
        break;
      case 'completed':
      default:
        result = await storyDB.getCompletedStories();
        break;
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      stories: result.stories
    });

  } catch (error) {
    console.error("Hikayeler getirme hatası:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
