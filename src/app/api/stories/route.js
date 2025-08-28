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

    // Geçici localStorage tabanlı hikaye oluşturma
    const stories = JSON.parse(localStorage.getItem('storychain_stories') || '[]');
    
    const newStory = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      theme: theme,
      authorId: authorId,
      authorNickname: authorNickname,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCompleted: false,
      likes: [],
      likeCount: 0,
      views: 0,
      isActive: true
    };

    // Hikayeyi kaydet
    stories.push(newStory);
    localStorage.setItem('storychain_stories', JSON.stringify(stories));

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

    // Geçici localStorage tabanlı hikaye getirme
    const stories = JSON.parse(localStorage.getItem('storychain_stories') || '[]');
    
    let result;
    switch (type) {
      case 'popular':
        const popularStories = stories
          .filter(s => s.isCompleted && s.isActive)
          .sort((a, b) => b.likeCount - a.likeCount)
          .slice(0, limit);
        result = { ok: true, stories: popularStories };
        break;
      case 'completed':
      default:
        const completedStories = stories
          .filter(s => s.isCompleted && s.isActive)
          .slice(0, 50);
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
