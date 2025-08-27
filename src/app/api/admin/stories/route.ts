// 10) app/api/admin/stories/route.ts — hikaye listele
import { prisma } from "@/lib/prisma";
export async function GET() {
  const stories = await prisma.story.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { id: true, name: true, email: true } } },
  });
  return new Response(JSON.stringify(stories), { headers: { "Content-Type": "application/json" } });
}
