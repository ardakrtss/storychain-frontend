export const runtime = "nodejs";

import { prisma } from "../../../../lib/prisma";
export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { stories: true } } },
  });
  return new Response(JSON.stringify(users), { headers: { "Content-Type": "application/json" } });
}
