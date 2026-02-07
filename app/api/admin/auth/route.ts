import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
  }
  if (password === secret) {
    return NextResponse.json({ ok: true, token: secret });
  }
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}

function getAuthHeader(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export function requireAdmin(request: NextRequest): boolean {
  const token = getAuthHeader(request);
  const secret = process.env.ADMIN_SECRET;
  return !!secret && token === secret;
}
