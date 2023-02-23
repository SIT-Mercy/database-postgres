import postgres from "postgres"
import * as db from "./db.js"
import { install as installSourceMap } from "source-map-support"

installSourceMap()
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

async function tryInitDatabase(): Promise<void> {
  await db.initDatabase(sql)
}
async function tryAddTestStudent(): Promise<void> {
  const id = await db.addStudent(sql, {
    studentID: "2210XY0AAA",
    name: "Tom",
    college: "Computer",
    poorLevel: 0,
    currentPoint: 0,
    creationTime: new Date(),
    phoneNumber: "123456789"
  })
  console.log(id)
}
await tryInitDatabase()
await tryAddTestStudent()
await sql.end()
