import { db } from "../db/db";
import { users } from "../db/schema";

export async function createUser(name: string, email: string) {
  return await db.insert(users).values({ name, email }).returning();
}

export async function getUsers() {
  return await db.select().from(users);
}
