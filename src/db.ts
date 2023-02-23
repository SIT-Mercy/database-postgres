import type postgres from "postgres"

const tables = {
  staff: "staff",
  students: "students",
  pointChanges: "point_changes",
  items: "item",
  transactions: "transcations",
  donations: "donations",
  rental: "rental",
  itemAmountChanges: "item_amount_changes",
}

export async function initDatabase(sql: postgres.Sql<any>): Promise<void> {
  await initStudents(sql)
  await initStaff(sql)
  await initPointChanges(sql)
  await initItems(sql)
  await initTransactions(sql)
  await initDonations(sql)
  await initItemAmountChanges(sql)
  await initRental(sql)
  sql`COMMIT;`
}

/**
 * `student id`: e.g.: 2210123456
 * table: {@link tables.students}
 */
async function initStudents(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(20) NOT NULL,
    point INT NOT NULL,
    phone_number VARCHAR(32),
    is_poor BOOLEAN NOT NULL,
    creation_time TIMESTAMP NOT NULL
  );
  `
}
/**
 * table: {@link tables.staff}
 */
async function initStaff(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS staff (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    password VARCHAR(20) NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    type VARCHAR NOT NULL,
    last_login TIMESTAMP,
    FOREIGN KEY (student_id)
      REFERENCES students(id)
  );
  `
}
/**
 * table: {@link tables.pointChanges}
 */
async function initPointChanges(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS point_changes (
    id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,
    operator_id INT NOT NULL,
    point_before INT NOT NULL,
    point_after INT NOT NULL,
    reason TEXT,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (subject_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}

/**
 * table: {@link tables.items}
 */
async function initItems(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    rent INT NOT NULL,
    poor_discount BOOLEAN NOT NULL,
    for_sale BOOLEAN NOT NULL,
    rentable BOOLEAN NOT NULL,
    creation_time TIMESTAMP NOT NULL
  );
  `
}

/**
 * table: {@link tables.transactions}
 */
async function initTransactions(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    note TEXT,
    item_id INT NOT NULL,
    customer_id INT NOT NULL,
    operator_id INT NOT NULL,
    amount INT NOT NULL,
    original_price INT NOT NULL,
    final_price INT NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (item_id)
      REFERENCES items(id),
    FOREIGN KEY (customer_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}

/**
 * table: {@link tables.itemAmountChanges}
 */
async function initItemAmountChanges(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS item_amount_changes (
    id SERIAL PRIMARY KEY,
    reason TEXT,
    related_id INT,
    item_id INT NOT NULL,
    amount_before INT NOT NULL,
    amount_after INT NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (item_id)
      REFERENCES items(id)
  );
  `
}

/**
 * table: {@link tables.donations}
 */
async function initDonations(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    note TEXT NOT NULL,
    donator_id INT NOT NULL,
    operator_id INT NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    FOREIGN KEY (donator_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}

/**
 * table: {@link tables.rental}
 */
async function initRental(sql: postgres.Sql<any>): Promise<void> {
  await sql`
  CREATE TABLE IF NOT EXISTS rental (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    borrower_id INT NOT NULL,
    operator_id INT NOT NULL,
    deadline TIMESTAMP NOT NULL,
    creation_time TIMESTAMP NOT NULL,
    return_time TIMESTAMP,
    FOREIGN KEY (borrower_id)
      REFERENCES students(id),
    FOREIGN KEY (operator_id)
      REFERENCES staff(id)
  );
  `
}
