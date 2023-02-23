import postgres from 'postgres'
const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: '',
  username: '',
  password: '',
})
const version = await sql`
SELECT version();
`

console.log(version)
