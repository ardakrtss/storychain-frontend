export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  // Önce ilgili hikâyeleri de sil (FK bağımlılığı)
  await prisma.story.deleteMany({ where: { authorId: id } });
  await prisma.user.delete({ where: { id } });
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
}
