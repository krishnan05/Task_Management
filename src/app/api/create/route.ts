import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "../../db/db";
import { tasks, users } from "../../db/schema";
import { eq } from "drizzle-orm";

// GET: Fetch all tasks with user info
export async function GET(req: NextRequest) {
  try {
    const username = req.headers.get("Authorization")?.split(" ")[1]; // Extract username from Authorization header

    if (!username) {
      return NextResponse.json({ error: "Authorization token missing or invalid" }, { status: 400 });
    }
    const user = await db.select().from(users).where(eq(users.name, username)).limit(1).execute();

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const allTasks = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        recurrence: tasks.recurrence,
        startdate: tasks.startdate,
        enddate: tasks.enddate,
        user: {
          name: users.name,
        },
      })
      .from(tasks)
      .innerJoin(users, eq(tasks.userId, user[0].id));

    console.log(allTasks);
    return NextResponse.json(allTasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST: Create a new task (Requires username)
export async function POST(req: NextRequest) {
  try {
    const { title, recurrence, startDate, endDate } = await req.json();
    const username = req.headers.get("Authorization")?.split(" ")[1]; // Extract username from Authorization header

    if (!username) {
      return NextResponse.json({ error: "Authorization token missing or invalid" }, { status: 400 });
    }

    // Validate if startDate and endDate are in the proper format
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    // Convert to valid date format (YYYY-MM-DD)
    const formattedStartDate = startDateObj.toISOString().split("T")[0];
    const formattedEndDate = endDateObj.toISOString().split("T")[0];

    const userExists = await db.select().from(users).where(eq(users.name, username));
    if (!userExists.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newTask = await db
      .insert(tasks)
      .values({
        title,
        recurrence,
        startdate: formattedStartDate,  // Use the ISO string format (YYYY-MM-DD)
        enddate: formattedEndDate,      // Use the ISO string format (YYYY-MM-DD)
        userId: userExists[0].id,
      })
      .returning();

    return NextResponse.json(newTask[0], { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
