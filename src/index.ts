import postgres from "postgres"
import { initDatabase } from "./db.js"

// temporarily for development
const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "sit_mercy",
  username: "sit_mercy",
  password: "sit_mercy",
})
const version = await sql`
SELECT version();
`

console.log(version)

await initDatabase(sql)

await sql.end()
