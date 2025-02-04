import { NextResponse, NextRequest } from "next/server";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
// POST: Login user by username
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const user = await db.select().from(users).where(eq(users.name, username)).limit(1).execute();

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }


    return NextResponse.json({name: user[0].name}, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
