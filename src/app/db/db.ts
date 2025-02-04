import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema"; // Ensure you have a schema file
dotenv.config();
const client = postgres(process.env.SUPABASE_DB_URL as string,{prepare:false});  
export const db = drizzle(client, { schema });