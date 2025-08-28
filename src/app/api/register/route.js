export const runtime = "nodejs";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, terms, privacy, kvkk } = body || {};

  if (!terms || !privacy || !kvkk) {
    return new Response(
      JSON.stringify({ message: "Tüm yasal onaylar (Kullanım Şartları, Gizlilik, KVKK) zorunludur." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // TODO: burada kullanıcı oluşturma işlemlerini yap (DB vb.)
  // ...

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
