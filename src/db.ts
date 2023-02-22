import postgres from 'postgres'

export function connectToPostgres(options: postgres.Options<{}>): postgres.Sql<{}> {
  return postgres(options)
}

export const sql = postgres({
  host: '',            // Postgres ip address[s] or domain name[s]
  port: 5432,          // Postgres server port[s]
  database: '',            // Name of database to connect to
  username: '',            // Username of database user
  password: '',            // Password of database user
})

const tables = {
  staff: "staff",
  students: "students",
  pointChanges: "point_changes",
  items: "item",
  donations: "donations",
  rental: "rental"
}

export function initDatabase(sql: postgres.Sql<{}>) {
  initStaff(sql)
  initStudens(sql)
  initPointChanges(sql)
  initItems(sql)
  initDonation(sql)
  initRental(sql)
}
/**
 * table: {@link tables.staff}
 */
function initStaff(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] staff (
    id SERIAL PRIMARY KEY,
    oa_account VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    last_login TIMESTAMP
  );
  `
}
/**
 * table: {@link tables.students}
 */
function initStudens(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] students (
    id SERIAL PRIMARY KEY,
    student_id INT UNIQUE NOT NULL,
    name VARCHAR(20) NOT NULL,
    point INT NOT NULL,
    phone_number VARCHAR(32),
    is_poor BOOLEAN NOT NULL
  );
  `
}
/**
 * table: {@link tables.pointChanges}
 */
function initPointChanges(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] poing_changes (
    id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,
    operator_id INT NOT NULL,
    point_before INT NOT NULL,
    point_after INT NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (subject_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}

function initItems(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    image_path VARCHAR NOT NULL,
    price INT NOT NULL,
    creation_time TIMESTAMP NOT NULL
  );
  `
}
/**
 * table: {@link tables.donations}
 */
function initDonation(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] donations (
    id SERIAL PRIMARY KEY,
    note TEXT NOT NULL,
    operator_id INT NOT NULL,
    count INT NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (operator_id)
      REFERENCES staff(id),
  );
  `
}

/**
 * table: {@link tables.rental}
 */
function initRental(sql: postgres.Sql<{}>) {
  sql`
  CREATE TABLE [IF NOT EXISTS] rental (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    borrower_id INT NOT NULL,
    operator_id INT NOT NULL,
    deadline TIMESTAMP NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (borrower_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id),
  );
  `
}