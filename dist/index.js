import postgres from "postgres";
import * as db from "./db.js";
import { install as installSourceMap } from "source-map-support";
installSourceMap();
const sql = postgres({
    host: "localhost",
    port: 5432,
    database: "sit_mercy",
    username: "sit_mercy",
    password: "sit_mercy",
});
const version = await sql `
SELECT version();
`;
console.log(version);
async function tryInitDatabase() {
    await db.initDatabase(sql);
}
async function tryAddTestStudent() {
    const id = await db.addStudent(sql, {
        studentID: "2210XY0AAA",
        name: "Tom",
        college: "Computer",
        poorLevel: 0,
        currentPoint: 0,
        creationTime: new Date(),
        phoneNumber: "123456789"
    });
    console.log(id);
}
async function tryQueryStudent() {
    const student = await db.queryStudentByID(sql, "2210XY0AAA");
    console.log(student);
}
async function tryAlterStudent() {
    await db.alterStudent(sql, 1, {
        studentID: "2210XY0AAA",
        name: "Tom",
        college: "Computer",
        poorLevel: 1,
        currentPoint: 100,
        creationTime: new Date(),
        phoneNumber: "123456789"
    });
    await tryQueryStudent();
}
await tryInitDatabase();
await tryQueryStudent();
await tryAlterStudent();
await sql.end();
//# sourceMappingURL=index.js.map