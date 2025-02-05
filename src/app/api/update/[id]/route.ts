import { NextResponse } from "next/server";
import { db } from "../../../db/db";
import { tasks } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

// GET: Fetch a specific task
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
   
    const task = await db.select().from(tasks).where(eq(tasks.id, Number(id)));

    if (!task.length) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    return NextResponse.json(task[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 500 });
  }
}

// PUT: Update a specific task
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { title, recurrence, startDate, endDate } = await req.json();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const formattedStartDate = startDateObj.toISOString().split("T")[0];
    const formattedEndDate = endDateObj.toISOString().split("T")[0];

    const updatedTask = await db.update(tasks)
      .set({ title, recurrence, startdate: formattedStartDate, enddate: formattedEndDate })
      .where(eq(tasks.id, Number(id)))
      .returning();

    if (!updatedTask.length) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    return NextResponse.json(updatedTask[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
