import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    if (!decoded || typeof decoded === "string" || !decoded.id) {
      throw new Error("Invalid token");
    }
  
    const user = await db.select().from(users).where(eq(users.id, decoded.id));
  
    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.next(); // Allow request to proceed
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}

// Apply middleware only to protected routes
export const config = {
  matcher: "/api/tasks/:path*",
};
