import { NextResponse, NextRequest } from "next/server";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import bcrypt from "bcrypt";

// POST: Create a new user
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    }).returning();

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
