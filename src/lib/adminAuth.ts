// 4) lib/adminAuth.ts — admin cookie doğrulama/ayarlama
// create lib/adminAuth.ts
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

export function setAdminSession() {
  cookies().set(COOKIE_NAME, "ok", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 saat
  });
}
export function clearAdminSession() {
  cookies().delete(COOKIE_NAME);
}
export function isAdminAuthed() {
  return cookies().get(COOKIE_NAME)?.value === "ok";
}
