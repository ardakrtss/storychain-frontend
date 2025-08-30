import { auth } from "./firebase";
import { signInWithCustomToken, signOut } from "firebase/auth";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function signupWithUsername({ username, password }) {
  const r = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!r.ok) throw new Error("signup_failed");
  return true;
}

export async function loginWithUsername({ username, password }) {
  const r = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error || "login_failed");

  // Firebase ile oturum aç
  await signInWithCustomToken(auth, data.token);
  return auth.currentUser;
}

export async function logout() {
  await signOut(auth);
}
