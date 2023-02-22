import postgres from 'postgres'
function testInitializeDatabase() {
  const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: '',
    username: '',
    password: '',
  })
}