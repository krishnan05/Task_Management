import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), 
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  recurrence: text("recurrence"),
  startdate: timestamp("startdate").notNull(),
  enddate: timestamp("enddate").notNull(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});
