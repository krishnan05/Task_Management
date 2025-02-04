import { db } from "../db/db";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";

export async function createTask(title: string, recurrence: string, startdate: Date, enddate: Date, userId: number) {
  return await db.insert(tasks).values({ title, recurrence, startdate, enddate, userId }).returning();
}

export async function getTasks() {
  return await db.select().from(tasks);
}

export async function getTasksWithUsers() {
  return await db
    .select({
      taskTitle: tasks.title,
      recurrence: tasks.recurrence,
    })
    .from(tasks)
    .innerJoin(users, eq(tasks.userId, users.id));
}
