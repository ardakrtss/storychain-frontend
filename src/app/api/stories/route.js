export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { moderateStory } from "../../../lib/moderation.js";
import { storyDB } from '../../../lib/firebaseDB.js';

// Hikaye oluşturma
export async function POST(req) {
  try {
    const { title, content, theme, authorId, authorNickname } = await req.json();

    // Validasyonlar
    if (!title || !content || !theme || !authorId || !authorNickname) {
      return NextResponse.json(
        { ok: false, error: "Tüm alanlar gerekli" },
        { status: 400 }
      );
    }

    // Moderasyon kontrolü
    const moderationResult = moderateStory({ title, content });
    if (!moderationResult.ok) {
      return NextResponse.json(
        { ok: false, error: moderationResult.reason },
        { status: 400 }
      );
    }

    // Firebase ile hikaye oluşturma
    const storyData = {
      title: title.trim(),
      content: content.trim(),
      theme: theme,
      authorId: authorId,
      authorNickname: authorNickname,
      isCompleted: false,
      views: 0
    };

    const newStory = await storyDB.createStory(storyData);

    return NextResponse.json({
      ok: true,
      story: newStory
    }, { status: 200 });

  } catch (e) {
    console.error("STORY_CREATE_API_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
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

    // Firebase'den hikaye getirme
    
    let result;
    switch (type) {
      case 'popular':
        const popularStories = await storyDB.getPopularStories(limit);
        result = { ok: true, stories: popularStories };
        break;
      case 'completed':
      default:
        const completedStories = await storyDB.getCompletedStories(50);
        result = { ok: true, stories: completedStories };
        break;
    }

    return NextResponse.json(result, { status: 200 });

  } catch (e) {
    console.error("STORY_GET_API_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
