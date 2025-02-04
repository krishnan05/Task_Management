import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "../../db/db";
import { tasks } from "../../db/schema";
import { eq } from "drizzle-orm";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const task = await db.select().from(tasks).where(eq(tasks.id, Number(params.id)));

    if (!task.length) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    return NextResponse.json(task[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, recurrence, startdate, enddate } = await req.json();
    const updatedTask = await db.update(tasks)
      .set({ title, recurrence, startdate: new Date(startdate), enddate: new Date(enddate) })
      .where(eq(tasks.id, Number(params.id)))
      .returning();

    if (!updatedTask.length) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    return NextResponse.json(updatedTask[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}


// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await db.delete(tasks).where(eq(tasks.id, Number(params.id)));
//     return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
//   }
// }

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const taskId = Number(params.id);

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const deleted = await db.delete(tasks).where(eq(tasks.id, taskId)).returning();

    if (!deleted.length) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
};