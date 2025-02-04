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

// POST: Create a new task (Requires user ID)
export async function POST(req: NextRequest) {
  try {
    const { title, recurrence, startdate, enddate, userId } = await req.json();
    // Ensure user exists
    const userExists = await db.select().from(users).where(eq(users.id, userId));
    if (!userExists.length) {
      console.log(error);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newTask = await db.insert(tasks).values({
      title,
      recurrence,
      startdate: new Date(startdate),
      enddate: new Date(enddate),
      userId,
    }).returning();

    return NextResponse.json(newTask[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
