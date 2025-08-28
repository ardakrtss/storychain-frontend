export const runtime = "nodejs";

import { NextResponse } from "next/server";
import admin from "firebase-admin";

function tryInit() {
  try {
    if (!admin.apps?.length) {
      const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });
    }
    return { ok: true, err: null };
  } catch (e) {
    console.error("FB_INIT_ERROR:", e);
    return { ok: false, err: String(e?.message || e) };
  }
}

export async function GET() {
  const envFlags = {
    FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
  };

  const init = tryInit();

  let firestore = { ok: false, err: null };
  if (init.ok) {
    try {
      const db = admin.firestore();
      const pingRef = db.collection("_health").doc("ping");
      await pingRef.set({ t: new Date() }, { merge: true });
      const snap = await pingRef.get();
      firestore.ok = snap.exists;
    } catch (e) {
      console.error("FS_ERROR:", e);
      firestore = { ok: false, err: String(e?.message || e) };
    }
  }

  return NextResponse.json(
    {
      env: envFlags,          // sadece boolean
      init,
      firestore,
    },
    { status: 200 }
  );
}
