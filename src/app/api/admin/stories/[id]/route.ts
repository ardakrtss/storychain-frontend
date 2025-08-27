// 11) app/api/admin/stories/[id]/route.ts — hikaye sil
import { prisma } from "@/lib/prisma";
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.story.delete({ where: { id } });
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
}
