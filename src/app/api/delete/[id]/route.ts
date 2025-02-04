import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "../../../db/db";
import { tasks } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params || !params.id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

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
}