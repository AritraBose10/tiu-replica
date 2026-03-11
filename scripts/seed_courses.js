import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
    process.exit(1);
}

const db = createClient({ url, authToken });

async function seed() {
    console.log("Starting seed...");
    try {
        const dataPath = path.resolve("./src/data/mock_courses.json");
        const rawData = await fs.readFile(dataPath, "utf-8");
        const courses = JSON.parse(rawData);

        await db.execute("DELETE FROM courses");
        console.log("Cleared courses table.");

        for (const course of courses) {
            const { id, title, description, category, link, duration } = course;
            // Provide duration if your database schema was updated to support it,
            // otherwise just insert standard fields. We will attempt standard fields.
            await db.execute({
                sql: "INSERT INTO courses (id, title, description, category, link, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
                args: [id, title, description, category, link, 0]
            });
            console.log(`Inserted: ${title} (${duration})`);
        }
        console.log("Seed complete!");
    } catch (e) {
        console.error("Error seeding:", e);
    }
}

seed();
