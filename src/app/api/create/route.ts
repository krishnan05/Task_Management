import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "../../db/db";
import { tasks, users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { error } from "console";

export async function GET() {
  try {
    const allTasks = await db
  .select({
    id: tasks.id,
    title: tasks.title,
    recurrence: tasks.recurrence,
    startdate: tasks.startdate,
    enddate: tasks.enddate,
    user: {
      id: users.id,
      name: users.name,
      email: users.email
    }
  })
  .from(tasks)
  .innerJoin(users, eq(tasks.userId, users.id));
  console.log(allTasks);
    return NextResponse.json(allTasks, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST: Create a new task (Requires user name)
export async function POST(req: NextRequest) {
  try {
    console.log(req);
    const { title, recurrence, startdate, enddate, } = await req.json();
    const username = req.headers.get('Authorization')?.split(' ')[1]; // Extract username from Authorization header

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const userExists = await db.select().from(users).where(eq(users.name, username));
    if (!userExists.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newTask = await db.insert(tasks).values({
      title,
      recurrence,
      startdate: new Date(startdate),
      enddate: new Date(enddate),
      userId: userExists[0].id,
    }).returning();

    return NextResponse.json(newTask[0], { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
